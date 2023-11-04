import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartProductsMock } from '@Mocks/products/get';

describe('Cart page content', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Empty cart', async () => {
        mock.addMocks(new GetCartProductsMock());

        await cartPage.fulfill();

        expect(cartPage.isEmpty()).toBe(false);

        cartPage.debug();
    });
});
