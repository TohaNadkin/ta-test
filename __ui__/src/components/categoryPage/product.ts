import { Component } from '@Core/component';

export class Product extends Component {
    public async seeFrame(): Promise<void> {
        return await this.locator.click();
    }
}
