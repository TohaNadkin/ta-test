import { test } from '@Test';
import { faker } from '@faker-js/faker';

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    test('hui hui', async ({ page, categoryPage, productPage, cartPage, checkoutPage }) => {
        await page.goto('/sunglasses');

        await categoryPage.noThxButton.click();

        const [firstProduct] = await categoryPage.getCategoryContent();
        await firstProduct.seeFrame();

        await productPage.addToCart();

        await cartPage.checkout();

        await checkoutPage.fillAddressForm({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            phone: faker.phone.number(),
        });

        await checkoutPage.continue();
        await checkoutPage.useDifferentCard();
        await page.pause();

        await checkoutPage.fillCardForm();

        await page.pause();
    });
});
