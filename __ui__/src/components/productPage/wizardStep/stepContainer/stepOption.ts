import { Component } from '@Core/component';

export class StepOption extends Component {
    public async select() {
        await this.locator.click();
    }
}
