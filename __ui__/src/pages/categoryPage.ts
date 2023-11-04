import { CookiePopup } from '@Components/categoryPage/cookiePopup';
import { Product } from '@Components/categoryPage/product';
import { Container } from '@Core/container';

export class CategoryPage extends Container {
    protected locators = {
        cookiePopup: this.page.locator('#onetrust-banner-sdk'),
        content: this.page.locator("//*[@data-test-name='product']"),
        noThxBtn: this.page.locator('button', {
            hasText: 'No thanks, remind me later',
        }),
    };

    public cookiePopup = new CookiePopup(this.locators.cookiePopup);

    public async clickNoThxBtn() {
        await this.locators.noThxBtn.click();
    }

    public async getCategoryContent(): Promise<Array<Product>> {
        const content = await this.locators.content.all();

        return content.map((product) => new Product(product, this.page));
    }
}
