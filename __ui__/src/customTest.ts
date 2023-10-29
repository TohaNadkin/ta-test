import { CartPage } from '@Pages/cartPage';
import { CategoryPage } from '@Pages/categoryPage';
import { ProductPage } from '@Pages/productPage';
import { WizardPage } from '@Pages/wizardPage';
import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { Pathes } from '@Utils/pathes';

// Добавить недостающие страницы в фикстуры и типы

type Options = {
    dataLayer: DataLayer;
    categoryPage: CategoryPage;
    productPage: ProductPage;
    wizardPage: WizardPage;
    cartPage: CartPage;
};

const test = base.extend<Options>({
    categoryPage: async ({ page }, use) => {
        use(new CategoryPage(page));
    },
    productPage: async ({ page }, use) => {
        use(new ProductPage(page));
    },
    wizardPage: async ({ page }, use) => {
        use(new WizardPage(page));
    },
    cartPage: async ({ page }, use) => {
        use(new CartPage(page));
    },
    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },
});

test.beforeEach(async ({ baseURL, context }) => {
    await context.addCookies([
        {
            name: 'OptanonAlertBoxClosed',
            value: new Date().toISOString(),
            url: baseURL,
        },
    ]);
});

export { test, expect };
