import { Component } from '@Core/component';
import { CreditCard } from './paymentMethods/creditCard';

export class PaymentStep extends Component {
    public cardForm: CreditCard = new CreditCard(this.locator, this.page);
}
