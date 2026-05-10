import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/estimate/route";

const envSnapshot = { ...process.env };

function formPost(formData: FormData): Request {
  return new Request("http://localhost/api/estimate", {
    method: "POST",
    body: formData,
  });
}

function validMinimalForm(): FormData {
  const fd = new FormData();
  fd.set("name", "Иван");
  fd.set("company", "ООО Тест");
  fd.set("phone", "+79990000000");
  fd.set("object", "ЖК Тестовый");
  return fd;
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  process.env = { ...envSnapshot };
  delete process.env.RESEND_API_KEY;
  delete process.env.ESTIMATE_EMAIL_FROM;
  delete process.env.ESTIMATE_EMAIL_TO;
  delete process.env.ESTIMATE_WEBHOOK_URL;
});

afterEach(() => {
  process.env = { ...envSnapshot };
});

describe("POST /api/estimate", () => {
  it("returns 400 when Content-Type is not multipart", async () => {
    const req = new Request("http://localhost/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 503 when neither Resend nor webhook is configured", async () => {
    const res = await POST(formPost(validMinimalForm()));
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body).toMatchObject({
      error: expect.stringContaining("RESEND_API_KEY"),
    });
  });

  it("returns 503 when Resend key is set but ESTIMATE_EMAIL_FROM is missing", async () => {
    process.env.RESEND_API_KEY = "re_test";
    const res = await POST(formPost(validMinimalForm()));
    expect(res.status).toBe(503);
  });

  it("returns 400 when required fields are missing", async () => {
    process.env.ESTIMATE_WEBHOOK_URL = "https://example.com/hook";
    const fd = new FormData();
    fd.set("name", "Only name");
    const res = await POST(formPost(fd));
    expect(res.status).toBe(400);
  });

  it("returns 200 for honeypot submissions without sending", async () => {
    process.env.ESTIMATE_WEBHOOK_URL = "https://example.com/hook";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const fd = validMinimalForm();
    fd.set("website", "http://spam.example");
    const res = await POST(formPost(fd));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts JSON to webhook and returns 200", async () => {
    process.env.ESTIMATE_WEBHOOK_URL = "https://example.com/hook";
    const fetchMock = vi.fn().mockResolvedValue(new Response("", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(formPost(validMinimalForm()));
    expect(res.status).toBe(200);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://example.com/hook");
    expect(init?.method).toBe("POST");
    const posted = JSON.parse(String(init?.body));
    expect(posted.company).toBe("ООО Тест");
    expect(posted.source).toBe("marusgroup-b2b-landing");
  });

  it("sends email via Resend when configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.ESTIMATE_EMAIL_FROM = "from@example.com";
    process.env.ESTIMATE_EMAIL_TO = "to@example.com";

    const fetchMock = vi.fn().mockResolvedValue(new Response("", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(formPost(validMinimalForm()));
    expect(res.status).toBe(200);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer re_test",
    });
    const payload = JSON.parse(String(init?.body));
    expect(payload.from).toBe("from@example.com");
    expect(payload.to).toEqual(["to@example.com"]);
  });

  it("returns 502 when webhook is the only channel and it fails", async () => {
    process.env.ESTIMATE_WEBHOOK_URL = "https://example.com/hook";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("err", { status: 500 })),
    );

    const res = await POST(formPost(validMinimalForm()));
    expect(res.status).toBe(502);
  });

  it("returns 200 when webhook fails but Resend succeeded", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.ESTIMATE_EMAIL_FROM = "from@example.com";
    process.env.ESTIMATE_WEBHOOK_URL = "https://example.com/hook";

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("", { status: 200 }))
      .mockResolvedValueOnce(new Response("bad", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(formPost(validMinimalForm()));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns 400 when a single attachment exceeds the limit", async () => {
    process.env.ESTIMATE_WEBHOOK_URL = "https://example.com/hook";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("", { status: 200 })));

    const fd = validMinimalForm();
    const big = new File([new Uint8Array(7 * 1024 * 1024)], "big.bin", {
      type: "application/octet-stream",
    });
    fd.append("photos", big);

    const res = await POST(formPost(fd));
    expect(res.status).toBe(400);
  });
});
