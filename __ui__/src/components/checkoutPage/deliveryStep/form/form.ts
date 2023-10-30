import { Component } from '@Core/component';

type checkoutDeliveryForm = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
};

export class DeliveryForm extends Component {
    protected locators = {
        firstNameInput: this.page.locator('//input[@data-test-name="firstNameInput"]').first(),
        lastNameInput: this.page.locator('//input[@data-test-name="lastNameInput"]').first(),
        emailInput: this.page.locator('//input[@data-test-name="emailInput"]').first(),
        phoneInput: this.page.locator('//input[@data-test-name="phoneInput"]').first(),
        addressInput: this.page.locator('//input[@data-test-name="addressInput"]').first(),
        cityInput: this.page.locator('//input[@data-test-name="cityInput"]').first(),
        postalInput: this.page.locator('//input[@data-test-name="postalInput"]').first(),
        stateSelect: this.page.locator('//select[@data-test-name="stateSelect"]').first(),
        countrySelect: this.page.locator('//select[@data-test-name="countrySelect"]').first(),
        continueBtn: this.page.locator('button', {
            hasText: 'Continue',
        }),
    };

    public async fillForm(formData: checkoutDeliveryForm): Promise<void> {
        await this.locators.firstNameInput.fill(formData.firstName);
        await this.locators.lastNameInput.fill(formData.lastName);
        await this.locators.emailInput.fill(formData.email);
        await this.locators.phoneInput.fill(formData.phone);
        await this.locators.addressInput.fill(formData.address);
        await this.locators.cityInput.fill(formData.city);
        await this.locators.postalInput.fill('35004');

        await this.locators.countrySelect.selectOption('United States');
        await this.locators.stateSelect.selectOption('Alabama');
    }
}
