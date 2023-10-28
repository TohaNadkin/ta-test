import { Locator } from '@playwright/test';

export class CookiePopup {
    constructor(private locator: Locator) {}

    protected locators = {
        acceptCookieButton: this.locator.locator('#onetrust-accept-btn-handler'),
    };

    public async acceptCookie() {
        return await this.locators.acceptCookieButton.click();
    }
}
