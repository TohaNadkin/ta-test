import { Component } from '@Core/component';
import { StepOption } from './stepContainer/stepOption';
import { Locator } from '@playwright/test';

export class StepContainer extends Component {
    protected locators = {
        option: this.locator.locator("//div[contains(@class, 'wizardSelectBox__container')]"),
        continueButton: this.locator.locator("//button[contains(string(), 'Continue')]"),
        addToCartButton: this.locator.locator("//button[contains(string(), 'Add to Cart')]"),
        noThxButton: this.locator.locator("//button[contains(string(), 'No Thanks')]"),
        getOptionByText: (text: string) =>
            this.locator.locator(
                `//div[contains(@class, 'wizardSelectBox__container') and contains(string(), '${text}')]`
            ),
    };

    public async continue(): Promise<void> {
        await this.locators.continueButton.click();
    }

    public async addToCart(): Promise<void> {
        await this.locators.addToCartButton.click();
    }

    public async noThanks(): Promise<void> {
        await this.locators.noThxButton.click();
    }

    public async getOptions(): Promise<Array<StepOption>> {
        return (await this.locators.option.all()).map(
            (el: Locator) => new StepOption(el, this.page)
        );
    }

    public async getOptionByText(text: string): Promise<StepOption> {
        return new StepOption(this.locators.getOptionByText(text), this.page);
    }
}
