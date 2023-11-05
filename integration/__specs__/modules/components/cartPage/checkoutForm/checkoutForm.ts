import { Component } from '@Core/component';

const SELECTORS = {
    cartTotal: './/p',
    checkoutBtn: './/button[contains(@class, "checkoutBtn")]',
};

export class CheckoutForm extends Component {
    public async getCartTotal(): Promise<number> {
        const [cartTotal] = await this.element.waitForXpath(SELECTORS.cartTotal);
        return Number(cartTotal.textContent.replace('$', ''));
    }

    public async getCartTotalString(): Promise<string> {
        const [cartTotal] = await this.element.waitForXpath(SELECTORS.cartTotal);
        return cartTotal.textContent;
    }

    public async isCanCheckout(): Promise<boolean> {
        const [checkoutBtn] = await this.element.waitForXpath(SELECTORS.checkoutBtn);
        return checkoutBtn.getAttribute('disabled') === null;
    }

    public async checkout(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.checkoutBtn);
    }
}
