import { test, expect } from "@playwright/test";

test.describe("estimate API with local webhook mock", () => {
  test("POST /api/estimate returns 200 when webhook accepts payload", async ({
    request,
  }) => {
    const res = await request.post("/api/estimate", {
      multipart: {
        name: "Тест",
        company: "ООО Тест",
        phone: "+79990000000",
        object: "ЖК Тест",
      },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
  });
});
