import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

// Добавить недостающие страницы в фикстуры и типы

type Options = {
    dataLayer: DataLayer;
};
const test = base.extend<Options>({
    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },
});

export { test, expect };
