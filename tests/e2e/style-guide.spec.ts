import { expect, test } from "@playwright/test";

test("shows the reusable UI foundation", async ({ page }) => {
  await page.goto("/style-guide");

  await expect(
    page.getByRole("heading", { level: 1, name: "UI foundations" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Core palette" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Primary" })).toHaveCount(6);
  await expect(page.getByRole("button", { name: /icon action/ })).toHaveCount(
    6,
  );
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveValue("hello@example.com");
});
