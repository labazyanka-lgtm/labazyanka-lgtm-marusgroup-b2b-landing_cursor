/**
 * Доставка заявок из формы «Запросить оценку».
 *
 * Поддерживаемые каналы (см. также `lib/site-config.ts` -> estimateDeliveryChannels):
 *
 * 1. Telegram-бот:                `ESTIMATE_TELEGRAM_BOT_TOKEN`, `ESTIMATE_TELEGRAM_CHAT_ID`
 * 2. Универсальный JSON-webhook: `ESTIMATE_WEBHOOK_URL`
 * 3. Email через Resend HTTP API: `RESEND_API_KEY`, `ESTIMATE_NOTIFY_EMAIL`,
 *    опц. `ESTIMATE_NOTIFY_FROM`
 *
 * Если ни один канал не сконфигурирован, заявка пишется в server-лог,
 * чтобы её можно было восстановить из логов хостинга.
 *
 * TODO[real-data]: настроить как минимум один канал на боевом окружении.
 */

export type EstimatePayload = {
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
  object: string;
  stage: string;
  zone: string;
  defects: string;
  volume: string;
  contactPref: string;
  requestTypes: string[];
  comment: string;
  /** Метаданные о приложенных файлах (без бинарного содержимого). */
  attachments: Array<{ name: string; size: number; type: string }>;
  /** Сырые файлы — нужны Telegram'у, не нужны webhook'у/логам. */
  files: File[];
};

type DeliveryResult = {
  channel: "telegram" | "webhook" | "email" | "log";
  ok: boolean;
  /** Текст ошибки от внешнего сервиса, если есть. */
  error?: string;
};

const MAX_FILES = 10;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB на файл

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatLine = (label: string, value: string | string[] | undefined): string | null => {
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value.join(", "))}`;
  }
  if (!value) return null;
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`;
};

const buildHtmlMessage = (p: EstimatePayload): string => {
  const lines: Array<string | null> = [
    "<b>Заявка с marusgroup.ru</b>",
    "",
    formatLine("Имя", p.name),
    formatLine("Должность", p.position),
    formatLine("Компания", p.company),
    formatLine("Телефон", p.phone),
    formatLine("Email", p.email),
    formatLine("Объект / ЖК", p.object),
    formatLine("Стадия", p.stage),
    formatLine("Зона работ", p.zone),
    formatLine("Тип замечаний", p.defects),
    formatLine("Объём", p.volume),
    formatLine("Способ связи", p.contactPref),
    formatLine("Что требуется", p.requestTypes),
    p.comment ? `<b>Комментарий:</b>\n${escapeHtml(p.comment)}` : null,
    p.attachments.length > 0
      ? `<b>Файлов прикреплено:</b> ${p.attachments.length}`
      : null,
  ];
  return lines.filter(Boolean).join("\n");
};

const sendTelegram = async (p: EstimatePayload): Promise<DeliveryResult> => {
  const token = process.env.ESTIMATE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.ESTIMATE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { channel: "telegram", ok: false, error: "not configured" };
  }

  const text = buildHtmlMessage(p);
  const textRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!textRes.ok) {
    const body = await textRes.text().catch(() => "");
    return {
      channel: "telegram",
      ok: false,
      error: `sendMessage ${textRes.status}: ${body.slice(0, 200)}`,
    };
  }

  const filesToSend = p.files.slice(0, MAX_FILES);
  for (const file of filesToSend) {
    if (file.size === 0 || file.size > MAX_FILE_BYTES) continue;

    const fd = new FormData();
    fd.set("chat_id", chatId);
    fd.set("document", file, file.name || "attachment");
    const fileRes = await fetch(
      `https://api.telegram.org/bot${token}/sendDocument`,
      { method: "POST", body: fd }
    );

    if (!fileRes.ok) {
      const body = await fileRes.text().catch(() => "");
      return {
        channel: "telegram",
        ok: false,
        error: `sendDocument ${fileRes.status}: ${body.slice(0, 200)}`,
      };
    }
  }

  return { channel: "telegram", ok: true };
};

const sendWebhook = async (p: EstimatePayload): Promise<DeliveryResult> => {
  const url = process.env.ESTIMATE_WEBHOOK_URL;
  if (!url) return { channel: "webhook", ok: false, error: "not configured" };

  const { files: _files, ...rest } = p;
  void _files;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "marusgroup.ru",
      receivedAt: new Date().toISOString(),
      ...rest,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return {
      channel: "webhook",
      ok: false,
      error: `${res.status}: ${body.slice(0, 200)}`,
    };
  }
  return { channel: "webhook", ok: true };
};

const sendEmail = async (p: EstimatePayload): Promise<DeliveryResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_NOTIFY_EMAIL;
  const from =
    process.env.ESTIMATE_NOTIFY_FROM ||
    "MARUS GROUP <onboarding@resend.dev>";
  if (!apiKey || !to) {
    return { channel: "email", ok: false, error: "not configured" };
  }

  const html = buildHtmlMessage(p).replace(/\n/g, "<br>");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Заявка с marusgroup.ru — ${p.company || p.name || "без названия"}`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return {
      channel: "email",
      ok: false,
      error: `${res.status}: ${body.slice(0, 200)}`,
    };
  }
  return { channel: "email", ok: true };
};

export async function deliverEstimate(
  payload: EstimatePayload
): Promise<{ ok: boolean; results: DeliveryResult[] }> {
  const tasks: Array<Promise<DeliveryResult>> = [];

  if (process.env.ESTIMATE_TELEGRAM_BOT_TOKEN && process.env.ESTIMATE_TELEGRAM_CHAT_ID) {
    tasks.push(sendTelegram(payload));
  }
  if (process.env.ESTIMATE_WEBHOOK_URL) {
    tasks.push(sendWebhook(payload));
  }
  if (process.env.RESEND_API_KEY && process.env.ESTIMATE_NOTIFY_EMAIL) {
    tasks.push(sendEmail(payload));
  }

  const results: DeliveryResult[] = tasks.length
    ? await Promise.all(
        tasks.map((t) =>
          t.catch((err: unknown): DeliveryResult => ({
            channel: "webhook",
            ok: false,
            error: err instanceof Error ? err.message : String(err),
          }))
        )
      )
    : [];

  if (results.length === 0) {
    const { files: _files, ...rest } = payload;
    void _files;
    // eslint-disable-next-line no-console
    console.warn(
      "[estimate] No delivery channel configured, dumping payload to logs:\n",
      JSON.stringify(rest, null, 2)
    );
    results.push({ channel: "log", ok: true });
  }

  // Считаем заявку успешно доставленной, если хотя бы один канал отработал.
  const ok = results.some((r) => r.ok);
  if (!ok) {
    // eslint-disable-next-line no-console
    console.error("[estimate] All delivery channels failed:", results);
  }
  return { ok, results };
}
