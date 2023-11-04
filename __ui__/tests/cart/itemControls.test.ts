import { WizardPage } from '@Pages/wizardPage';
import { expect, test } from '@Test';
import { Pathes } from '@Utils/pathes';
import { waitFor } from '@Utils/waitFor';

test.describe('Item controls on cart page', () => {
    test('hui hui', async ({ page, categoryPage, productPage, cartPage, wizardPage }) => {
        await page.goto(Pathes.eyeglassesCategory);

        await categoryPage.clickNoThxBtn();

        const [firstProduct] = await categoryPage.getCategoryContent();
        await firstProduct.seeFrame();

        await productPage.chooseLenses();

        const nonRxWizardUsageStepOption = await wizardPage.stepContainer.getOptionByText(
            'Non-prescription'
        );
        await nonRxWizardUsageStepOption.select();
        const [firstWizardLensePackage] = await wizardPage.stepContainer.getOptions();
        await firstWizardLensePackage.select();
        await wizardPage.stepContainer.continueButton.click();
        const [firstWizardLenseType] = await wizardPage.stepContainer.getOptions();
        await firstWizardLenseType.select();
        await wizardPage.stepContainer.continueButton.click();
        await wizardPage.stepContainer.noThxButton.click();
        await wizardPage.stepContainer.addToCartButton.click();

        let cartTotal = await cartPage.getCartTotal();
        const [cartItem] = await cartPage.getItemList();
        const itemPrice = await cartItem.getSpecialPrice();
        const isTotalChanged = async () => cartTotal !== (await cartPage.getCartTotal());

        expect(cartTotal).toEqual(itemPrice);

        cartItem.increaseItemCount();
        await waitFor(isTotalChanged);
        cartTotal = await cartPage.getCartTotal();
        expect(cartTotal).toEqual(itemPrice * 2);

        cartItem.decreaseItemCount();
        await waitFor(isTotalChanged);
        cartTotal = await cartPage.getCartTotal();
        expect(cartTotal).toEqual(itemPrice);

        await (await cartItem.removeItem()).confirm();
        expect((await cartPage.getItemList()).length).toEqual(0);
    });
});
