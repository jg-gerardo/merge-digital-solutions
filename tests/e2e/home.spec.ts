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

test("shows the primary navigation", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/about",
  );
  await expect(
    navigation.getByRole("link", { name: "Services" }),
  ).toHaveAttribute("href", "/services");
  await expect(navigation.getByRole("link", { name: "Works" })).toHaveAttribute(
    "href",
    "/works",
  );
  await expect(
    navigation.getByRole("link", { name: "Contact" }),
  ).toHaveAttribute("href", "/contact");
  await expect(page.getByRole("link", { name: "Let's Talk" })).toHaveAttribute(
    "href",
    "/contact",
  );
});

test("opens and closes the navigation on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /navigation/ });
  await toggle.click();

  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeHidden();
});
