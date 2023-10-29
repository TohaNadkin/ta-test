import { WizardPage } from '@Pages/wizardPage';
import { Container } from '@Core/container';

export class ProductPage extends Container {
    protected locators = {
        chooseLensesButton: this.page.locator('button', {
            hasText: 'Choose Lenses',
        }),
        addTocart: this.page.locator('button', {
            hasText: 'Add to Cart',
        }),
        productName: this.page.locator("//h1[contains(@class, 'baseInfo__name')]"),
    };

    public async chooseLenses(): Promise<void> {
        await this.locators.chooseLensesButton.click();
    }

    public async addToCart(): Promise<void> {
        await this.locators.addTocart.click();
    }

    public async productname(): Promise<string | null> {
        return await this.locators.productName.textContent();
    }
}
