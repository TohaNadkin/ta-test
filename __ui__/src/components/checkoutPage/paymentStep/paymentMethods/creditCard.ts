import { Component } from '@Core/component';
import { waitFor } from '@Utils/waitFor';

type CheckoutCardFormType = {
    number?: string;
    expDate?: string;
    cvv?: string;
};
export class CreditCard extends Component {
    protected locators = {
        cardNumberInput: this.page.frameLocator('//div[@id="card-number"]/iframe').locator('#pan'),
        cvvInput: this.page.frameLocator('//div[@id="cvv"]/iframe').locator('#cvv'),
        exparetionDateInput: this.page
            .frameLocator('//div[@id="exp-date"]/iframe')
            .locator('#expiration_date'),
        differentCardBtn: this.page.locator('button', {
            hasText: 'use different card',
        }),
        placeOrderBtn: this.page.locator('//div[contains(@class, "paymentCreditCardWrapper")]//button[@aria-label="Place Order"]'),
    };

    public async fillCardForm(formData: CheckoutCardFormType): Promise<void> {
        await (formData.number ? this.locators.cardNumberInput.fill(formData.number as string) : Promise.resolve());
        await (formData.expDate ? this.locators.exparetionDateInput.fill(formData.expDate as string) : Promise.resolve());
        await (formData.cvv ? this.locators.cvvInput.fill(formData.cvv as string) : Promise.resolve());
    }

    public async useDifferentCard(): Promise<void> {
        await this.locators.differentCardBtn.click();
    }

    public async placeOrder(): Promise<void> {
        await this.locators.placeOrderBtn.click()
    }
}
