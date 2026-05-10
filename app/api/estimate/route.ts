import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_COMMENT = 8000;
const MAX_FIELD = 500;
const MAX_TOTAL_ATTACH = 12 * 1024 * 1024;
const MAX_SINGLE_ATTACH = 6 * 1024 * 1024;

type EstimatePayload = {
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
  photosMeta: { name: string; size: number; type: string }[];
};

function trimField(v: unknown, max: number): string {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function buildEmailText(p: EstimatePayload): string {
  const lines = [
    "Новая заявка с сайта MARUS GROUP",
    "",
    `Имя: ${p.name}`,
    `Должность: ${p.position || "—"}`,
    `Компания: ${p.company}`,
    `Телефон: ${p.phone}`,
    `Email: ${p.email || "—"}`,
    "",
    `Объект / ЖК: ${p.object}`,
    `Стадия: ${p.stage || "—"}`,
    `Зона работ: ${p.zone || "—"}`,
    `Тип замечаний: ${p.defects || "—"}`,
    `Примерный объём: ${p.volume || "—"}`,
    `Удобный способ связи: ${p.contactPref || "—"}`,
    `Что требуется: ${p.requestTypes.length ? p.requestTypes.join(", ") : "—"}`,
    "",
    "Комментарий:",
    p.comment || "—",
    "",
    "Вложения:",
    p.photosMeta.length
      ? p.photosMeta.map((f) => `• ${f.name} (${f.type}, ${f.size} байт)`).join("\n")
      : "нет",
  ];
  return lines.join("\n");
}

async function sendResendEmail(opts: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  attachments: { filename: string; content: string }[];
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
      ...(opts.attachments.length ? { attachments: opts.attachments } : {}),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend ${res.status}: ${errText}`);
  }
}

async function postWebhook(
  url: string,
  body: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Webhook ${res.status}: ${t}`);
  }
}

export async function POST(request: Request) {
  const ct = request.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Ожидается multipart/form-data" },
      { status: 400 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.ESTIMATE_EMAIL_FROM;
  const emailTo = process.env.ESTIMATE_EMAIL_TO ?? "info@marusgroup.ru";
  const webhookUrl = process.env.ESTIMATE_WEBHOOK_URL?.trim();

  if (!resendKey && !webhookUrl) {
    return NextResponse.json(
      {
        error:
          "Сервер не настроен: задайте RESEND_API_KEY или ESTIMATE_WEBHOOK_URL",
      },
      { status: 503 },
    );
  }

  if (resendKey && !emailFrom) {
    return NextResponse.json(
      { error: "Задайте ESTIMATE_EMAIL_FROM для отправки почты" },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Некорректное тело запроса" }, { status: 400 });
  }

  if (String(formData.get("website") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = trimField(formData.get("name"), MAX_FIELD);
  const company = trimField(formData.get("company"), MAX_FIELD);
  const phone = trimField(formData.get("phone"), MAX_FIELD);
  const objectName = trimField(formData.get("object"), MAX_FIELD);

  if (!name || !company || !phone || !objectName) {
    return NextResponse.json(
      { error: "Заполните обязательные поля: имя, компания, телефон, объект" },
      { status: 400 },
    );
  }

  const requestTypes = formData
    .getAll("request-type")
    .map((v) => trimField(v, 80))
    .filter(Boolean);

  const payload: EstimatePayload = {
    name,
    position: trimField(formData.get("position"), MAX_FIELD),
    company,
    phone,
    email: trimField(formData.get("email"), MAX_FIELD),
    object: objectName,
    stage: trimField(formData.get("stage"), MAX_FIELD),
    zone: trimField(formData.get("zone"), MAX_FIELD),
    defects: trimField(formData.get("defects"), MAX_FIELD),
    volume: trimField(formData.get("volume"), MAX_FIELD),
    contactPref: trimField(formData.get("contact-pref"), MAX_FIELD),
    requestTypes,
    comment: trimField(formData.get("comment"), MAX_COMMENT),
    photosMeta: [],
  };

  const rawFiles = formData.getAll("photos");
  const attachments: { filename: string; content: string }[] = [];
  let totalBytes = 0;

  for (const entry of rawFiles) {
    if (!(entry instanceof File) || !entry.size) continue;
    if (entry.size > MAX_SINGLE_ATTACH) {
      return NextResponse.json(
        { error: `Файл «${entry.name}» слишком большой (макс. ${MAX_SINGLE_ATTACH / 1024 / 1024} МБ)` },
        { status: 400 },
      );
    }
    totalBytes += entry.size;
    if (totalBytes > MAX_TOTAL_ATTACH) {
      return NextResponse.json(
        { error: "Суммарный размер вложений превышает лимит" },
        { status: 400 },
      );
    }

    payload.photosMeta.push({
      name: entry.name,
      size: entry.size,
      type: entry.type || "application/octet-stream",
    });

    const buf = Buffer.from(await entry.arrayBuffer());
    attachments.push({
      filename: entry.name || "photo.jpg",
      content: buf.toString("base64"),
    });
  }

  const textBody = buildEmailText(payload);
  const subject = `Заявка с сайта: ${payload.company} — ${payload.object}`;

  try {
    if (resendKey && emailFrom) {
      await sendResendEmail({
        apiKey: resendKey,
        from: emailFrom,
        to: emailTo,
        subject,
        text: textBody,
        attachments,
      });
    }

    if (webhookUrl) {
      try {
        await postWebhook(webhookUrl, {
          source: "marusgroup-b2b-landing",
          submittedAt: new Date().toISOString(),
          ...payload,
        });
      } catch (whErr) {
        console.error("[estimate] webhook failed:", whErr);
        if (!resendKey) {
          throw whErr;
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[estimate] send failed:", e);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам." },
      { status: 502 },
    );
  }
}
