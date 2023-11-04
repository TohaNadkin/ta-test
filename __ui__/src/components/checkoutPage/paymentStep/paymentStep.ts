import { Component } from '@Core/component';
import { CreditCard } from './paymentMethods/creditCard';
import { CashOnDelivery } from './paymentMethods/cashOnDelivery';

export class PaymentStep extends Component {
    protected locators = {
        chooseCashOnDeliveryMethod: this.locator.locator('button', {
            hasText: 'Cash On Delivery',
        }),
        cashOnDeliveryMethod: this.locator.locator(
            '//div[contains(@class, "paymentWrapper__wrapper")]',
            {
                hasText: 'Cash On Delivery',
            }
        ),
    };

    public cardFormMethod: CreditCard = new CreditCard(this.locator, this.page);
    public cashOnDeliveryMethod: CashOnDelivery = new CashOnDelivery(
        this.locators.cashOnDeliveryMethod,
        this.page
    );

    public async chooseCashOnDeliveryPaymentMethod(): Promise<void> {
        await this.locators.cashOnDeliveryMethod.click();
    }
}
