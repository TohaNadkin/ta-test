import { Component } from '@Core/component';
import { DeliveryForm } from './form/form';

export class DeliveryStep extends Component {
    protected locators = {
        continueBtn: this.locator.locator('button', {
            hasText: 'Continue',
        }),
    };

    public form: DeliveryForm = new DeliveryForm(this.locator, this.page);

    public async continue(): Promise<void> {
        await this.locators.continueBtn.click();
    }
}
