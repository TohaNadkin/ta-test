import { CategoryPage } from '@Pages/categoryPage';
import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { Pathes } from '@Utils/pathes';

// Добавить недостающие страницы в фикстуры и типы

type Options = {
    dataLayer: DataLayer;
    CategoryPage: CategoryPage;
};
const test = base.extend<Options>({
    CategoryPage: async ({ page }, use) => {
        use(new CategoryPage(page));
    },
    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },
});

export { test, expect };
