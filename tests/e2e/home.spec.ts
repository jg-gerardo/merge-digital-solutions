import { expect, test } from "@playwright/test";

test("shows the site identity", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "We design digital experiences that move your business forward.",
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Merge Digital Solutions");

  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute("href", "/merge-favicon.png");

  const faviconResponse = await page.request.get("/merge-favicon.png");
  expect(faviconResponse.ok()).toBe(true);
  expect(faviconResponse.headers()["content-type"]).toBe("image/png");
});

test("shows the first section artwork", async ({ page }) => {
  await page.goto("/");

  const heroContent = page.locator("[data-hero-section] [data-section-reveal]");

  await expect(heroContent).toHaveAttribute("data-reveal-visible", "");
  await expect(heroContent).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-hero-visual]")).toBeVisible();
  await expect(page.locator("[data-hero-card]")).toHaveCount(3);
  await expect(page.locator('[data-hero-card="primary"] img')).toHaveAttribute(
    "src",
    "/assets/images/card-design-1.png",
  );
  await expect(page.locator('[data-hero-card="top"] img')).toHaveAttribute(
    "src",
    "/assets/images/card-design-2.png",
  );
  await expect(page.locator('[data-hero-card="bottom"] img')).toHaveAttribute(
    "src",
    "/assets/images/card-design-3.png",
  );
  await expect(
    page.getByRole("link", { name: "Explore the system" }),
  ).toHaveAttribute("href", "/style-guide");
  await expect(
    page.getByRole("link", { name: "Preview the palette" }),
  ).toHaveAttribute("href", "/style-guide#colors-title");
});

test("shows the services, featured works, and contact sections", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("#services")).toHaveCSS("border-top-width", "1px");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "End-to-end solutions for your digital needs.",
    }),
  ).toBeVisible();
  await expect(page.locator("[data-service-card]")).toHaveCount(4);
  const servicesLink = page.getByRole("link", {
    name: "VIEW ALL SERVICES",
    exact: true,
  });
  await expect(servicesLink).toHaveAttribute("href", "/services");
  await expect(servicesLink.locator("svg")).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 2, name: "Featured works" }),
  ).toBeVisible();
  const worksLink = page.getByRole("link", {
    name: "VIEW ALL WORKS",
    exact: true,
  });
  await expect(worksLink).toHaveAttribute("href", "/works");
  await expect(worksLink.locator("svg")).toBeVisible();
  await expect(page.locator("[data-featured-work]")).toHaveCount(3);
  await expect(
    page.locator("[data-featured-work] img").first(),
  ).toHaveAttribute("src", "/assets/images/card-design-4.png");
  await expect(page.locator(".closing-sections")).toHaveCSS(
    "border-top-width",
    "1px",
  );
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Let’s build something amazing together.",
    }),
  ).toBeVisible();
  await expect(page.locator("[data-contact-cta]")).toHaveCSS(
    "background-image",
    /card-design-5\.png/,
  );
  await expect(page.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
    "href",
    "/contact",
  );
  await expect(page.locator("[data-site-footer]")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Stay updated" }),
  ).toBeVisible();
  await expect(page.getByLabel("Enter your email")).toHaveAttribute(
    "type",
    "email",
  );
});

test("reveals the hero foreground as it enters the viewport", async ({
  page,
}) => {
  await page.goto("/");

  const heroContent = page.locator("[data-hero-section] [data-section-reveal]");
  const background = page.locator('[aria-labelledby="hero-title"] > img');

  await expect(heroContent).toHaveAttribute("data-reveal-visible", "");
  await expect(background).not.toHaveAttribute("data-section-reveal", "");

  await page.evaluate(() => {
    document.body.style.minHeight = "300vh";
    window.scrollTo(0, window.innerHeight * 2);
  });

  await expect(heroContent).not.toHaveAttribute("data-reveal-visible", "");
  await expect(heroContent).toHaveCSS("opacity", "0");

  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(heroContent).toHaveAttribute("data-reveal-visible", "");
  await expect(heroContent).toHaveCSS("opacity", "1");
});

test("glides, coasts, and returns hero cards without overlap", async ({
  page,
}) => {
  await page.goto("/");

  const primaryCard = page.locator('[data-hero-card="primary"]');
  const topCard = page.locator('[data-hero-card="top"]');
  const cardBounds = await primaryCard.boundingBox();

  expect(cardBounds).not.toBeNull();
  if (!cardBounds) return;

  await page.mouse.move(
    cardBounds.x + cardBounds.width * 0.75,
    cardBounds.y + cardBounds.height * 0.75,
  );

  await expect
    .poll(() =>
      primaryCard.evaluate((element) =>
        Number.parseFloat(
          getComputedStyle(element).getPropertyValue("--card-x"),
        ),
      ),
    )
    .toBeGreaterThan(1);

  expect(
    await primaryCard.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--card-x")),
    ),
  ).toBeLessThanOrEqual(72);

  await expect
    .poll(() =>
      topCard.evaluate((element) =>
        Math.abs(
          Number.parseFloat(
            getComputedStyle(element).getPropertyValue("--card-x"),
          ),
        ),
      ),
    )
    .toBeGreaterThan(0.01);

  expect(
    await topCard.evaluate((element) =>
      Math.abs(
        Number.parseFloat(
          getComputedStyle(element).getPropertyValue("--card-x"),
        ),
      ),
    ),
  ).toBeLessThanOrEqual(5);

  await expect
    .poll(() =>
      primaryCard.evaluate((element) =>
        element.style.getPropertyValue("--ripple-x"),
      ),
    )
    .toMatch(/px$/);
  expect(
    await primaryCard.evaluate(
      (element) => getComputedStyle(element, "::after").animationName,
    ),
  ).not.toBe("none");

  await page.mouse.move(10, 10);
  await page.waitForTimeout(750);

  expect(
    await primaryCard.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--card-x")),
    ),
  ).toBeGreaterThan(1);

  await page.waitForTimeout(4500);
  const returnStart = await primaryCard.evaluate((element) =>
    Math.abs(
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--card-x")),
    ),
  );

  await page.waitForTimeout(500);
  const returnProgress = await primaryCard.evaluate((element) =>
    Math.abs(
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--card-x")),
    ),
  );

  expect(returnProgress).toBeLessThan(returnStart);

  const cardsOverlap = await page
    .locator("[data-hero-card]")
    .evaluateAll((cards) => {
      const bounds = cards.map((card) => card.getBoundingClientRect());

      return bounds.some((card, index) =>
        bounds
          .slice(index + 1)
          .some(
            (otherCard) =>
              card.left < otherCard.right &&
              card.right > otherCard.left &&
              card.top < otherCard.bottom &&
              card.bottom > otherCard.top,
          ),
      );
    });

  expect(cardsOverlap).toBe(false);
});

test("shows the primary navigation", async ({ page }) => {
  await page.goto("/");

  const header = page.locator("[data-site-header]");
  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  await expect(header).toHaveCSS("position", "absolute");
  expect(
    await page
      .locator('[aria-labelledby="hero-title"]')
      .evaluate((element) => element.getBoundingClientRect().top),
  ).toBe(0);
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
  const contactLink = page.getByRole("link", { name: "Let's Talk" });
  await expect(page.locator(".site-header__cta")).toHaveCount(1);
  await expect(contactLink).toHaveAttribute("href", "/contact");
  await expect(contactLink).toHaveAttribute("data-variant", "secondary");
});

test("opens and closes the navigation on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /navigation/ });
  await toggle.click();

  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await expect(navigation).toBeVisible();
  await expect(navigation).toHaveCSS("position", "fixed");
  await expect
    .poll(async () => (await navigation.boundingBox())?.x)
    .toBeCloseTo(0, 0);

  const sheetBounds = await navigation.boundingBox();
  expect(sheetBounds).not.toBeNull();
  expect(sheetBounds?.x).toBeCloseTo(0, 0);
  expect(sheetBounds?.width).toBeCloseTo(292.5, 0);

  await expect(
    navigation.getByRole("link", { name: "Merge Digital Solutions home" }),
  ).toBeVisible();
  const sheetContactLink = navigation.getByRole("link", {
    name: "Let's Talk",
  });
  await expect(sheetContactLink).toHaveCount(0);
  const mobileContactLink = page.getByRole("link", { name: "Let's Talk" });
  await expect(mobileContactLink).toBeVisible();
  await expect(mobileContactLink).toHaveAttribute("data-variant", "secondary");

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).toBeHidden();
});
