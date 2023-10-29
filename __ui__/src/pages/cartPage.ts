import { Container } from '@Core/container';
import { waitFor } from '@Utils/waitFor';
export class CartPage extends Container {
    protected locators = {
        checkoutBtn: this.page.locator('button', {
            hasText: 'Proceed to Checkout',
        }),
    };

    public async checkout(): Promise<void> {
        const locateCheckoutBtn = () => this.locators.checkoutBtn;
        await waitFor(locateCheckoutBtn);
        await this.locators.checkoutBtn.click();
    }
}
