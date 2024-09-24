import { test, expect } from "@playwright/test";

const OTEL_DEMO_URL = "http://localhost:8080";

test("purchases a product added to the cart", async ({ page }) => {
  await page.goto(OTEL_DEMO_URL);
  await expect(page).toHaveTitle(/OTel demo/);

  await page.getByTestId("product-card").nth(4).click();

  await page.waitForURL(/\/product\/\w+/);
  await page.getByTestId("product-quantity").selectOption({ value: "4" });
  await page.getByTestId("product-add-to-cart").click();

  await page.waitForURL(/\/cart$/);
  await page.getByTestId("checkout-place-order").click();
  await page.waitForURL(/\/cart\/checkout/);
  await page.getByRole("button", { name: "Continue Shopping" }).click();
});

test("adds a product and empty the cart", async ({ page }) => {
  await page.goto(OTEL_DEMO_URL);
  await expect(page).toHaveTitle(/OTel demo/);

  await page.getByTestId("product-card").nth(6).click();

  await page.waitForURL(/\/product\/\w+/);
  await page.getByTestId("product-quantity").selectOption({ value: "4" });
  await page.getByTestId("product-add-to-cart").click();

  await page.waitForURL(/\/cart$/);
  await page.getByRole("button", { name: "Empty Cart" }).click();
  await page
    .getByRole("heading", { name: /Your shopping cart is empty!/i })
    .isVisible();
});

test("randomly click around", async ({ page }) => {
  let counter = 0;
  while (counter++ < 1000) {
    await sleep(1000);

    await page.goto(OTEL_DEMO_URL);
    await expect(page).toHaveTitle(/OTel demo/);

    await page
      .getByTestId("product-card")
      .nth(Math.round(Math.random() * 12))
      .click();

    await page.waitForURL(/\/product\/\w+/);
    await page.getByTestId("product-quantity").selectOption({ value: "4" });
    await page.getByTestId("product-add-to-cart").click();

    await page.waitForURL(/\/cart$/);
    await page.getByTestId("checkout-place-order").click();
    await page.waitForURL(/\/cart\/checkout/);
    await page.getByRole("button", { name: "Continue Shopping" }).click();
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
