import { Component } from '@Core/component';
import { ContinueButton } from './stepContainer/continueButton';
import { AddToCartButton } from './stepContainer/addToCartButton';
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

    public continueButton = new ContinueButton(this.locators.continueButton, this.page);
    public addToCartButton = new AddToCartButton(this.locators.addToCartButton, this.page);
    public noThxButton = new ContinueButton(this.locators.noThxButton, this.page);

    public async getOptions(): Promise<Array<StepOption>> {
        return (await this.locators.option.all()).map(
            (el: Locator) => new StepOption(el, this.page)
        );
    }

    public async getOptionByText(text: string): Promise<StepOption> {
        return new StepOption(this.locators.getOptionByText(text), this.page);
    }
}
