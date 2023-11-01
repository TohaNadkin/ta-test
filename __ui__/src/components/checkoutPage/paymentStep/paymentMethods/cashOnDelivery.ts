import { Component } from '@Core/component';

export class CashOnDelivery extends Component {
    protected locators = {
        placeOrderBtn: this.locator.locator('//button[@aria-label="Place Order"]'),
    };

    public async placeOrder(): Promise<void> {
        await this.locators.placeOrderBtn.click();
    }
}
