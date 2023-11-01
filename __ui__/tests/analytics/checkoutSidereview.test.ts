import { expect, test } from '@Test';
import { DataLayer } from '@Utils/dataLayer';
import { Pathes } from '@Utils/pathes';
import { faker } from '@faker-js/faker';

const INVALID_CARD_DATA = {
    number: '4222222222222222',
};

const CREDIT_CARD_EVENT = {
    event: "CheckoutNonInteraction",
    eventAction: "Step 2 - Credit card",
    eventCategory: "Checkout - D",
}

test.beforeEach(async ({page, categoryPage, productPage, cartPage, checkoutPage})=>{
    await page.goto(Pathes.sunglassesCategory);

    await categoryPage.noThxButton.click();

    const [firstProduct] = await categoryPage.getCategoryContent();
    await firstProduct.seeFrame();

    await productPage.addToCart();//санная корзина не хочет ттовары добавлять(

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
})

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    test('hui hui', async ({ page, checkoutPage }) => {

        await page.waitForTimeout(5000);
        await checkoutPage.paymentStep.cardForm.useDifferentCard();
        await page.waitForTimeout(5000);
        await checkoutPage.paymentStep.cardForm.fillCardForm(INVALID_CARD_DATA);

        await checkoutPage.paymentStep.cardForm.placeOrder();


        const dataLayer: DataLayer = new DataLayer(page);

        // const hui = await dataLayer.events

        // console.log(hui);

        const [event] = await dataLayer.waitForDataLayer(CREDIT_CARD_EVENT)

        expect<string>(event.eventLabel as string).toEqual('Error – Please enter a valid credit card number')
    });
});
