import { StepContainer } from '../components/productPage/wizardStep/stepContainer';
import { Container } from '@Core/container';

export class WizardPage extends Container {
    protected locators = {
        stepContainer: this.page.locator("//div[contains(@class, 'steps__container')]"),
    };

    public get stepContainer(): StepContainer {
        return new StepContainer(this.locators.stepContainer, this.page);
    }
}
