import { test } from '@Test';
import { Pathes } from '@Utils/pathes';
import { faker } from '@faker-js/faker';

const INVALID_CARD_DATA = {
    number: '4222222222222222',
    expDate: '12 / 23',
    cvv: '123',
};

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    test('hui hui', async ({ page, categoryPage, productPage, cartPage, checkoutPage }) => {
        await page.goto(Pathes.sunglassesCategory);

        await categoryPage.noThxButton.click();

        const [firstProduct] = await categoryPage.getCategoryContent();
        await firstProduct.seeFrame();

        await productPage.addToCart();

        await cartPage.checkout();

        await checkoutPage.deliveryStep.form.fillForm({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            phone: faker.phone.number(),
        });

        await checkoutPage.deliveryStep.continue();

        await checkoutPage.paymentStep.cardForm.useDifferentCard();
        await checkoutPage.paymentStep.cardForm.fillCardForm(INVALID_CARD_DATA);

        await page.pause();
    });
});
