import { Button } from '@Core/button';

export class NoThxButton extends Button {
    public async click() {
        await this.locator.click();
    }
}
