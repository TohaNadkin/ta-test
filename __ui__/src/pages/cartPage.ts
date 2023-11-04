import { CartItem } from '@Components/cartPage/cartItem';
import { Container } from '@Core/container';
import { waitFor } from '@Utils/waitFor';
import { map } from 'p-iteration';
export class CartPage extends Container {
    protected locators = {
        checkoutBtn: this.page.locator('button', {
            hasText: 'Proceed to Checkout',
        }),
        cartTotal: this.page.locator('//span[@id="summary_grand_total"]'),
        itemsList: this.page.locator('//ul[contains(@class, "filteredCartList__list")]'),
    };

    public async waitForLoadList(): Promise<void> {
        const isItemListVisible = () => this.locators.cartTotal.isVisible();
        await waitFor(isItemListVisible);
    }

    public async checkout(): Promise<void> {
        const locateCheckoutBtn = () => this.locators.checkoutBtn;
        await waitFor(locateCheckoutBtn);
        await this.locators.checkoutBtn.click();
    }

    public async getItemList(): Promise<Array<CartItem>> {
        return await map(
            await this.locators.itemsList.locator('li').all(),
            (locator) => new CartItem(locator, this.page)
        );
    }

    public async getCartTotal(): Promise<number> {
        return parseFloat((await this.locators.cartTotal.textContent())!.replace('$', ''));
    }
}
