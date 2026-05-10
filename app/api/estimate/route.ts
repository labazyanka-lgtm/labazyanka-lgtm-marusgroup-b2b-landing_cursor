import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED_FIELDS = ["name", "company", "phone", "object"] as const;
const TEXT_FIELDS = [
  "name",
  "position",
  "company",
  "phone",
  "email",
  "object",
  "stage",
  "zone",
  "defects",
  "volume",
  "contact-pref",
  "comment",
] as const;

type ParsedSubmission = {
  fields: Record<string, string>;
  requestTypes: string[];
  files: File[];
  totalBytes: number;
};

function strField(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

async function parse(form: FormData): Promise<ParsedSubmission> {
  const fields: Record<string, string> = {};
  for (const key of TEXT_FIELDS) fields[key] = strField(form, key);

  const requestTypes = form
    .getAll("request-type")
    .filter((v): v is string => typeof v === "string");

  const files = form
    .getAll("photos")
    .filter((v): v is File => v instanceof File && v.size > 0)
    .slice(0, siteConfig.estimateApi.maxFiles);

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  return { fields, requestTypes, files, totalBytes };
}

function validate(p: ParsedSubmission): string | null {
  for (const key of REQUIRED_FIELDS) {
    if (!p.fields[key]) return `Не заполнено обязательное поле: ${key}`;
  }
  if (p.totalBytes > siteConfig.estimateApi.maxTotalBytes) {
    return `Суммарный размер файлов превышает ${
      siteConfig.estimateApi.maxTotalBytes / 1024 / 1024
    } МБ`;
  }
  if (p.fields.phone.replace(/\D/g, "").length < 10) {
    return "Некорректный телефон";
  }
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderText(p: ParsedSubmission): string {
  const f = p.fields;
  const labels: Array<[string, string]> = [
    ["Имя", f.name],
    ["Должность", f.position],
    ["Компания", f.company],
    ["Телефон", f.phone],
    ["Email", f.email],
    ["Объект / ЖК", f.object],
    ["Стадия объекта", f.stage],
    ["Зона работ", f.zone],
    ["Тип замечаний", f.defects],
    ["Примерный объём", f.volume],
    ["Удобный способ связи", f["contact-pref"]],
    ["Что требуется", p.requestTypes.join(", ")],
    ["Комментарий", f.comment],
  ];
  const lines = labels
    .filter(([, v]) => v && v.length > 0)
    .map(([k, v]) => `${k}: ${v}`);
  if (p.files.length > 0) {
    lines.push(
      `Прикреплено фото: ${p.files.length} (${(p.totalBytes / 1024).toFixed(0)} КБ)`,
    );
  }
  return lines.join("\n");
}

function renderHtml(p: ParsedSubmission): string {
  const f = p.fields;
  const rows: Array<[string, string]> = (
    [
      ["Имя", f.name],
      ["Должность", f.position],
      ["Компания", f.company],
      ["Телефон", f.phone],
      ["Email", f.email],
      ["Объект / ЖК", f.object],
      ["Стадия объекта", f.stage],
      ["Зона работ", f.zone],
      ["Тип замечаний", f.defects],
      ["Примерный объём", f.volume],
      ["Удобный способ связи", f["contact-pref"]],
      ["Что требуется", p.requestTypes.join(", ")],
      ["Комментарий", f.comment],
    ] as Array<[string, string]>
  ).filter(([, v]) => v && v.length > 0);

  const body = rows
    .map(
      ([k, v]) =>
        `<b>${escapeHtml(k)}:</b> ${escapeHtml(v).replace(/\n/g, "<br>")}`,
    )
    .join("\n");
  const photos =
    p.files.length > 0
      ? `\n<b>Фото:</b> ${p.files.length} шт. (${(p.totalBytes / 1024).toFixed(0)} КБ)`
      : "";
  return `<b>Новая заявка с MARUS GROUP</b>\n\n${body}${photos}`;
}

type DeliveryResult = {
  channel: string;
  ok: boolean;
  detail?: string;
};

async function sendTelegram(p: ParsedSubmission): Promise<DeliveryResult | null> {
  const token = process.env.ESTIMATE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.ESTIMATE_TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;

  try {
    const messageRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: renderHtml(p),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    if (!messageRes.ok) {
      return {
        channel: "telegram",
        ok: false,
        detail: `sendMessage ${messageRes.status}`,
      };
    }

    for (const file of p.files) {
      const fd = new FormData();
      fd.append("chat_id", chatId);
      fd.append("document", file, file.name || "photo");
      const docRes = await fetch(
        `https://api.telegram.org/bot${token}/sendDocument`,
        { method: "POST", body: fd },
      );
      if (!docRes.ok) {
        return {
          channel: "telegram",
          ok: false,
          detail: `sendDocument ${docRes.status}`,
        };
      }
    }

    return { channel: "telegram", ok: true };
  } catch (err) {
    return {
      channel: "telegram",
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

async function sendWebhook(
  p: ParsedSubmission,
): Promise<DeliveryResult | null> {
  const url = process.env.ESTIMATE_WEBHOOK_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "marusgroup-landing",
        receivedAt: new Date().toISOString(),
        fields: p.fields,
        requestTypes: p.requestTypes,
        files: p.files.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
      }),
    });
    if (!res.ok) {
      return { channel: "webhook", ok: false, detail: `HTTP ${res.status}` };
    }
    return { channel: "webhook", ok: true };
  } catch (err) {
    return {
      channel: "webhook",
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

async function sendEmail(p: ParsedSubmission): Promise<DeliveryResult | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_NOTIFY_EMAIL;
  const from = process.env.ESTIMATE_NOTIFY_FROM;
  if (!apiKey || !to || !from) return null;

  try {
    const html = renderHtml(p)
      .replace(/\n/g, "<br>")
      .replace(/<b>/g, "<strong>")
      .replace(/<\/b>/g, "</strong>");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Новая заявка с сайта — ${p.fields.company || p.fields.name}`,
        html: `<div style="font-family:system-ui,Arial,sans-serif;font-size:14px;color:#15171A">${html}</div>`,
        text: renderText(p),
      }),
    });
    if (!res.ok) {
      return { channel: "email", ok: false, detail: `HTTP ${res.status}` };
    }
    return { channel: "email", ok: true };
  } catch (err) {
    return {
      channel: "email",
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ожидался multipart/form-data" },
      { status: 400 },
    );
  }

  // Honeypot: тихо принимаем, но никуда не шлём.
  if (typeof form.get("website") === "string" && (form.get("website") as string).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = await parse(form);
  const validationError = validate(parsed);
  if (validationError) {
    return NextResponse.json(
      { ok: false, error: validationError },
      { status: 400 },
    );
  }

  const results = (
    await Promise.all([
      sendTelegram(parsed),
      sendWebhook(parsed),
      sendEmail(parsed),
    ])
  ).filter((r): r is DeliveryResult => r !== null);

  if (results.length === 0) {
    // Ни один канал не сконфигурирован — пишем в server-лог, чтобы заявка не потерялась.
    console.warn(
      "[estimate] no delivery channel configured, dumping submission to log:\n" +
        renderText(parsed),
    );
    return NextResponse.json({ ok: true, delivered: [] });
  }

  const anyOk = results.some((r) => r.ok);
  if (!anyOk) {
    console.error("[estimate] all delivery channels failed", results);
    return NextResponse.json(
      { ok: false, error: "Не удалось доставить заявку. Попробуйте позже или позвоните нам." },
      { status: 502 },
    );
  }

  for (const r of results.filter((r) => !r.ok)) {
    console.warn(`[estimate] channel ${r.channel} failed: ${r.detail}`);
  }

  return NextResponse.json({
    ok: true,
    delivered: results.filter((r) => r.ok).map((r) => r.channel),
  });
}
