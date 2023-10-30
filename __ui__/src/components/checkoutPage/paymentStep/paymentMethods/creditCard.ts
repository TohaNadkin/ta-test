import { Component } from '@Core/component';

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
    };

    public async fillCardForm(formData: CheckoutCardFormType): Promise<void> {
        await this.locators.cardNumberInput.fill(formData.number);
        await this.locators.exparetionDateInput.fill(formData.expDate);
        await this.locators.cvvInput.fill(formData.cvv);
    }
    public async useDifferentCard(): Promise<void> {
        await this.locators.differentCardBtn.click();
    }
}
