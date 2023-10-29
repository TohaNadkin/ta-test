import { Component } from '@Core/component';
import { Locator, Page } from '@playwright/test';

export class Product extends Component {
    public async seeFrame(): Promise<void> {
        return await this.locator.click();
    }
}
