import { Component } from '@Core/component';

type CheckoutCardFormType = {
    number?: string;
    expDate?: string;
    cvv?: string;
};
export class CreditCard extends Component {
    protected locators = {
        cardNumberInput: this.locator
            .frameLocator('//div[@id="card-number"]/iframe')
            .locator('#pan'),
        cvvInput: this.locator.frameLocator('//div[@id="cvv"]/iframe').locator('#cvv'),
        exparetionDateInput: this.locator
            .frameLocator('//div[@id="exp-date"]/iframe')
            .locator('#expiration_date'),
        differentCardBtn: this.locator.locator('button', {
            hasText: 'use different card',
        }),
        placeOrderBtn: this.locator.locator(
            '//div[contains(@class, "paymentCreditCardWrapper")]//button[@aria-label="Place Order"]'
        ),
    };

    public async fillCardForm(formData: CheckoutCardFormType): Promise<void> {
        await (formData.number
            ? this.locators.cardNumberInput.fill(formData.number as string)
            : Promise.resolve());
        await (formData.expDate
            ? this.locators.exparetionDateInput.fill(formData.expDate as string)
            : Promise.resolve());
        await (formData.cvv
            ? this.locators.cvvInput.fill(formData.cvv as string)
            : Promise.resolve());
    }

    public async useDifferentCard(): Promise<void> {
        await this.locators.differentCardBtn.click();
    }

    public async placeOrder(): Promise<void> {
        await this.locators.placeOrderBtn.click();
    }
}
