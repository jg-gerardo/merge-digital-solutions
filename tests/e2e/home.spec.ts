import { expect, test } from "@playwright/test";

test("shows the site identity", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Merge Digital Solutions" }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Merge Digital Solutions");

  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute("href", "/merge-favicon.png");

  const faviconResponse = await page.request.get("/merge-favicon.png");
  expect(faviconResponse.ok()).toBe(true);
  expect(faviconResponse.headers()["content-type"]).toBe("image/png");
});
