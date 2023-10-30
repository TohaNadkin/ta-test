import { DeliveryStep } from '@Components/checkoutPage/deliveryStep/deliveryStep';
import { PaymentStep } from '@Components/checkoutPage/paymentStep/paymentStep';
import { Container } from '@Core/container';

type checkoutCardForm = {
    number: string;
    expDate: string;
    cvv: string;
};

export class CheckoutPage extends Container {
    protected locators = {
        deliveryStep: this.page.locator('//div[@name="deliveryStep"]'),
        paymentStep: this.page.locator('//div[@name="paymentStep"]'),
    };

    public deliveryStep: DeliveryStep = new DeliveryStep(this.locators.deliveryStep, this.page);
    public paymentStep: PaymentStep = new PaymentStep(this.locators.paymentStep, this.page);
}
