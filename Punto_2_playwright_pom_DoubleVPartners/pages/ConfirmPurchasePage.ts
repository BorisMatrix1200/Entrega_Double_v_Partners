import { Page, Locator,} from '@playwright/test';
import { faker } from '@faker-js/faker';


export class ConfirmPurchasePage {
  readonly page: Page;

  readonly btnCheckout: Locator;
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtAdress: Locator;
  readonly txtCity: Locator;
  readonly txtPostCode: Locator;
  readonly txtComment: Locator;
  readonly selCountry: Locator;
  readonly selRegionState: Locator;
  readonly btnContinue: Locator;
  readonly btnContinueShiping: Locator;
  readonly chkTermsConditions: Locator;
  readonly btnConfirmOrder: Locator;
  
  // Generate fake data
  private NAME: string;
  private LASTNAME: string;
  private ADRESS: string;


  constructor(page: Page) {
    this.page = page;

    this.btnCheckout = page.getByRole('link', { name: 'Checkout', exact: true });
    this.txtFirstName = page.getByRole('textbox', { name: '* First Name' });
    this.txtLastName = page.getByRole('textbox', { name: '* Last Name' });
    this.txtAdress = page.getByRole('textbox', { name: '* Address' });
    this.txtCity = page.getByRole('textbox', { name: '* City' });
    this.txtPostCode = page.getByRole('textbox', { name: '* Post Code' });
    this.txtComment = page.locator('textarea[name="comment"]');
    this.selCountry = page.getByLabel('Country');
    this.selRegionState = page.getByLabel('Region / State');
    this.btnContinue = page.getByRole('button', { name: 'Continue' });
    this.btnContinueShiping= page.locator('#button-shipping-address');
    this.chkTermsConditions = page.getByRole('checkbox');
    this.btnConfirmOrder = page.getByRole('button', { name: 'Confirm Order' });
  
    // Generate fake data
    this.NAME = faker.person.firstName();
    this.LASTNAME = faker.person.lastName();
    this.ADRESS = faker.string.alphanumeric(9);

  }
  
  async confirmPurchase() {
    
    await this.btnCheckout.click();
    await this.txtFirstName.click();
    await this.txtFirstName.fill(this.NAME);
    await this.txtLastName.click();
    await this.txtLastName.fill(this.LASTNAME);
    await this.txtAdress.click();
    await this.txtAdress.fill(this.ADRESS);
    await this.txtCity.click();
    await this.txtCity.fill('Medellin');
    await this.txtPostCode.click();
    await this.txtPostCode.fill('05004');
    await this.selCountry.selectOption('47');
    await this.selRegionState.selectOption('721');
    await this.btnContinue.click();
    await this.btnContinueShiping.click();
    await this.txtComment.fill('Prueba de compra');
    await this.btnContinue.click();
    await this.chkTermsConditions.check();
    await this.btnContinue.click();
    await this.btnConfirmOrder.click();

  }

}
