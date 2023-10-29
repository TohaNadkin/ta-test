import { Component } from './component';

export class Button extends Component {
    public async click() {
        await this.locator.click();
    }
}
