import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartProductsMock } from '@Mocks/products/get';
import { asyncForEach } from '@Utils/asyncForeach';
import { waitFor } from '@Utils/waitFor';
import { reduce } from 'p-iteration';

describe('Cart page content', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Empty cart', async () => {
        mock.addMocks(new GetCartProductsMock());

        await cartPage.fulfill();

        const cartItems = await cartPage.getCartItems();

        const cartTotal = await reduce(cartItems, async (acc, cur) => acc + (await cur.getSubtotal()), 0);

        const checkoutForm = await cartPage.getCheckoutForm();

        expect(cartTotal).toEqual(await checkoutForm.getCartTotal());

        await asyncForEach(cartItems, el => el.deleteItem());

        await asyncForEach(cartItems, async el => {
            expect(window.dataLayer).toContainEqual({
                name: 'Remove item',
                value: await el.getName(),
            });
        });

        expect(cartPage.isEmpty()).toBe(true);
        expect(await checkoutForm.isCanCheckout()).toBe(false);
        expect(await (await cartPage.getCheckoutForm()).getCartTotal()).toEqual(0);

        const addItemForm = await cartPage.getAddItemForm();

        await addItemForm.fillForm({
            name: 'hui',
            price: 999,
            qty: 2,
        });

        await addItemForm.addItem();

        await waitFor(() => !cartPage.isEmpty());

        expect(cartPage.isEmpty()).toBe(false);

        await checkoutForm.checkout();

        expect(window.dataLayer).toContainEqual({
            name: 'Proceed to Checkout',
            value: await checkoutForm.getCartTotalString(),
        });
    });
});
