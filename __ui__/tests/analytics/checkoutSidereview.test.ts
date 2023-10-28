import { CategoryPage } from '@Pages/categoryPage';
import { test } from '@Test';
import { EventEmitter } from 'node:events';

const acceptCoockieName = 'OptanonAlertBoxClosed';

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    test('hui hui', async ({ page, context, baseURL, CategoryPage }) => {
        await context.addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/sunglasses');
    });
});
