import { Component } from '@Core/component';

export class RemoveCartItemPopup extends Component {
    protected locators = {
        confirmButton: this.locator.locator('//button[@data-test-name="buttonConfirm"]'),
    };

    public async confirm(): Promise<void> {
        await this.locators.confirmButton.click();
    }
}
