import { Container } from '@Core/container';
import type { CartStateType } from 'frontend/store/types';
import { CartItem } from './cartItem/cartItem';
import { CheckoutForm } from './checkoutForm/checkoutForm';
import { AddItemForm } from './addItemForm/addItemForm';

const SELECTORS = {
    emptyCart: './/h2[text()="Cart is empty, please add items"]',
    cartItems: './/div[contains(@class, "CartItemCard")]',
    checkoutform: './/div[contains(@class, "summary")]',
    addNewItemForm: './/form[contains(@class, "form")]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState?: CartStateType): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCheckoutForm(): Promise<CheckoutForm> {
        const [checkoutElement] = await document.waitForXpath(SELECTORS.checkoutform);
        return new CheckoutForm(checkoutElement);
    }

    public async getCartItems(): Promise<CartItem[]> {
        return (await document.waitForXpath(SELECTORS.cartItems)).map((el: Element) => {
            return new CartItem(el);
        });
    }

    public async getAddItemForm(): Promise<AddItemForm> {
        const [checkoutElement] = await document.waitForXpath(SELECTORS.addNewItemForm);
        return new AddItemForm(checkoutElement);
    }

    public isEmpty(): boolean {
        return Boolean(document.$x(SELECTORS.emptyCart));
    }
}
