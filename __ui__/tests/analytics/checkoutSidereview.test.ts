import { test } from '@Test';

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    test('hui hui', async ({ page, categoryPage, productPage, cartPage }) => {
        await page.goto('/sunglasses');

        await categoryPage.noThxButton.click();

        const [firstProduct] = await categoryPage.getCategoryContent();
        await firstProduct.seeFrame();

        await productPage.addToCart();

        await cartPage.checkout();

        await page.pause();
    });
});
