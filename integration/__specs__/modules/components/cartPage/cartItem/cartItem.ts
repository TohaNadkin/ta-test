import { Component } from '@Core/component';

const SELECTORS = {
    subtotal: './/p[contains(text(), "Subtotal")]',
    deleteBtn: './/button[contains(@title, "remove")]',
    itemName: './/h3[contains(@title, "name")]',
};

export class CartItem extends Component {
    public async getSubtotal(): Promise<number> {
        const [subtotal] = await this.element.waitForXpath(SELECTORS.subtotal);
        return Number(subtotal.textContent.replace('Subtotal: $', ''));
    }

    public async deleteItem(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.deleteBtn);
    }

    public async getName(): Promise<string> {
        const [itemName] = await this.element.waitForXpath(SELECTORS.itemName);
        return itemName.textContent;
    }
}
