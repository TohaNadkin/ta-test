import { CookiePopup } from '@Components/categoryPage/cookiePopup';
import { Container } from '@Core/container';

export class CategoryPage extends Container {
    protected locators = {
        cookiePopup: this.page.locator('#onetrust-banner-sdk'),
        content: this.page.locator("//*[@data-test-name='product']"),
    };

    public cookiePopup = new CookiePopup(this.locators.cookiePopup);

    // public async getCategoryContent(): Promise<Array<Product>> {
    //     const content = await this.locators.content.all();

    //     return content.map((product) => new Product(product, this.page));
    // }
}
