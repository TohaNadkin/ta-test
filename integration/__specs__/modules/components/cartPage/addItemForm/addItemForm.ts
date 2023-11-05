import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';
import { NameInput } from './inputs/nameInput';
import { PriceInput } from './inputs/priceInput';
import { QtyInput } from './inputs/qtyInput';

const SELECTORS = {
    nameInput: './/input[contains(@name, "name")]',
    priceInput: './/input[contains(@name, "price")]',
    qtyInput: './/input[contains(@name, "quantity")]',
    addItemButton: './/button[contains(@class, "addNewProductBtn")]',
};

type AddItemFormData = {
    name: string;
    price: number;
    qty: number;
};

export class AddItemForm extends Component {
    public async fillForm(data: AddItemFormData): Promise<void> {
        const [nameInput] = await this.element.waitForXpath(SELECTORS.nameInput);
        new NameInput(nameInput).input(data.name);

        const [priceInput] = await this.element.waitForXpath(SELECTORS.priceInput);
        new PriceInput(priceInput).input(data.price.toString());

        const [qtyInput] = await this.element.waitForXpath(SELECTORS.qtyInput);
        new QtyInput(qtyInput).input(data.qty.toString());
    }

    public async addItem(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.addItemButton);
    }
}
