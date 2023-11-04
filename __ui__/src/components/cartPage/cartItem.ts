import { Component } from '@Core/component';
import { RemoveCartItemPopup } from './cartItem/removeCartItemPopup';

export class CartItem extends Component {
    protected locators = {
        specialPrice: this.locator.locator('//span[@data-test-name="specialPrice"]'),
        increaseItemCount: this.locator.locator('//button[@data-test-name="counterIncrease"]'),
        decreaseItemCount: this.locator.locator('//button[@data-test-name="counterDecrease"]'),
        removeItem: this.locator.locator('//button[@data-test-name="removeCartItem"]'),
        removePopup: this.locator.locator('//div[@data-test-name="removeCartItemPopup"]'),
    };

    public async removeItem(): Promise<RemoveCartItemPopup> {
        await this.locators.removeItem.click();
        return new RemoveCartItemPopup(this.locators.removePopup, this.page);
    }

    public async getSpecialPrice(): Promise<number> {
        return parseFloat((await this.locators.specialPrice.textContent())!.replace('$', ''));
    }

    public async increaseItemCount(): Promise<void> {
        await this.locators.increaseItemCount.click();
    }

    public async decreaseItemCount(): Promise<void> {
        await this.locators.decreaseItemCount.click();
    }
}
