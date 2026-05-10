import { test, expect } from "@playwright/test";

test.describe("landing smoke", () => {
  test("homepage renders hero and estimate section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main h1")).toContainText(/Доводим стекло и алюминиевый профиль/i);
    await expect(page.locator("main h1")).toContainText(/приёмки/i);
    await expect(page.locator("#estimate")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /запросить оценку по объекту/i }),
    ).toBeVisible();
    await expect(page.locator("#experience img").first()).toBeVisible();
  });

  test("estimate API returns 503 when server has no mail/webhook config", async ({
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

    expect(res.status()).toBe(503);
    const body = await res.json();
    expect(body).toMatchObject({
      error: expect.stringContaining("RESEND_API_KEY"),
    });
  });
});
