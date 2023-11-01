import { expect, test } from '@Test';
import { DataLayer } from '@Utils/dataLayer';
import { Pathes } from '@Utils/pathes';
import { faker } from '@faker-js/faker';

const INVALID_CARD = {
    number: '4222222222222222',
    expDate: '',
    cvv: '',
};

const VALID_CARD = {
    number: '4111111111111111',
    expDate: '12 /23',
    cvv: '123',
};

const INVALID_CARD_NUMBER_EVENT = {
    event: 'CheckoutNonInteraction',
    eventAction: 'Step 2 - Credit card',
    eventCategory: 'Checkout - D',
    eventLabel: 'Error – Please enter a valid credit card number',
};

const INVALID_EXP_DATE_EVENT = {
    event: 'CheckoutNonInteraction',
    eventAction: 'Step 2 - Credit card',
    eventCategory: 'Checkout - D',
    eventLabel: 'Error – Please enter a valid expiration date',
};

const INVALID_CVV_EVENT = {
    event: 'CheckoutNonInteraction',
    eventAction: 'Step 2 - Credit card',
    eventCategory: 'Checkout - D',
    eventLabel: "Error – Please enter your card's security code (CVV/CID)",
};

const CASH_OB_DELIVERY_ORDER_EVENT = {
    event: 'CheckoutInteraction',
    eventAction: 'Step 2 - Payment',
    eventCategory: 'Checkout - D',
    eventLabel: 'CTA - Place Order - Cash On Delivery',
};

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    test('hui hui', async ({ page, categoryPage, productPage, cartPage, checkoutPage }) => {
        await page.goto(Pathes.sunglassesCategory);

        await categoryPage.noThxButton.click();

        const [firstProduct] = await categoryPage.getCategoryContent();
        await firstProduct.seeFrame();

        await productPage.addToCart(); //санная корзина не хочет ттовары добавлять(

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

        await page.waitForTimeout(5000);
        await checkoutPage.paymentStep.cardFormMethod.useDifferentCard();

        const dataLayer: DataLayer = new DataLayer(page);

        await page.waitForTimeout(5000);

        await checkoutPage.paymentStep.cardFormMethod.fillCardForm({
            number: INVALID_CARD.number,
        });
        await checkoutPage.paymentStep.cardFormMethod.placeOrder();
        const [invalidCardNumberEvent] = await dataLayer.waitForDataLayer(
            INVALID_CARD_NUMBER_EVENT
        );
        expect(invalidCardNumberEvent).toEqual(INVALID_CARD_NUMBER_EVENT);

        await checkoutPage.paymentStep.cardFormMethod.fillCardForm({
            number: VALID_CARD.number,
            expDate: INVALID_CARD.cvv,
        });
        await checkoutPage.paymentStep.cardFormMethod.placeOrder();
        const [invalidExpDateEvent] = await dataLayer.waitForDataLayer(INVALID_EXP_DATE_EVENT);
        expect(invalidExpDateEvent).toEqual(INVALID_EXP_DATE_EVENT);

        await checkoutPage.paymentStep.cardFormMethod.fillCardForm({
            number: VALID_CARD.number,
            expDate: VALID_CARD.expDate,
            cvv: INVALID_CARD.cvv,
        });
        await checkoutPage.paymentStep.cardFormMethod.placeOrder();
        const [invalidCvvEvent] = await dataLayer.waitForDataLayer(INVALID_CVV_EVENT);
        expect(invalidCvvEvent).toEqual(INVALID_CVV_EVENT);

        await checkoutPage.paymentStep.chooseCashOnDeliveryPaymentMethod();
        await checkoutPage.paymentStep.cashOnDeliveryMethod.placeOrder();
        const [cashOnDeliveryOrderEvent] = await dataLayer.waitForDataLayer(
            CASH_OB_DELIVERY_ORDER_EVENT
        );
        expect(cashOnDeliveryOrderEvent).toEqual(CASH_OB_DELIVERY_ORDER_EVENT);
    });
});
