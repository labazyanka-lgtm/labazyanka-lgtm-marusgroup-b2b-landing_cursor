import { NextResponse } from "next/server";
import { deliverEstimate, type EstimatePayload } from "@/lib/estimate-delivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB на одну заявку
const MAX_FILES = 10;

const getString = (data: FormData, key: string): string => {
  const v = data.get(key);
  return typeof v === "string" ? v.trim() : "";
};

const getStrings = (data: FormData, key: string): string[] => {
  return data
    .getAll(key)
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
};

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form data" },
      { status: 400 }
    );
  }

  // Honeypot. Бот заполнит это поле, человек — нет. В таком случае возвращаем 200,
  // чтобы бот считал, что всё прошло, но никуда не доставляем.
  if (getString(form, "website")) {
    return NextResponse.json({ ok: true, results: [] });
  }

  const name = getString(form, "name");
  const company = getString(form, "company");
  const phone = getString(form, "phone");
  const objectName = getString(form, "object");

  if (!name || !company || !phone || !objectName) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Заполните обязательные поля: имя, компания, телефон, объект.",
      },
      { status: 400 }
    );
  }

  const rawFiles = form
    .getAll("photos")
    .filter((v): v is File => v instanceof File && v.size > 0);

  if (rawFiles.length > MAX_FILES) {
    return NextResponse.json(
      {
        ok: false,
        error: `Слишком много файлов. Максимум — ${MAX_FILES}.`,
      },
      { status: 413 }
    );
  }

  const totalSize = rawFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: `Суммарный размер файлов превышает ${Math.round(
          MAX_TOTAL_BYTES / (1024 * 1024)
        )} МБ.`,
      },
      { status: 413 }
    );
  }

  const payload: EstimatePayload = {
    name,
    position: getString(form, "position"),
    company,
    phone,
    email: getString(form, "email"),
    object: objectName,
    stage: getString(form, "stage"),
    zone: getString(form, "zone"),
    defects: getString(form, "defects"),
    volume: getString(form, "volume"),
    contactPref: getString(form, "contact-pref"),
    requestTypes: getStrings(form, "request-type"),
    comment: getString(form, "comment"),
    attachments: rawFiles.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    })),
    files: rawFiles,
  };

  try {
    const result = await deliverEstimate(payload);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку. Попробуйте позже." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[estimate] Unhandled error:", err);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера." },
      { status: 500 }
    );
  }
}
