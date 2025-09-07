import { Page, Locator,} from '@playwright/test';
import { faker } from '@faker-js/faker';


export class RegisterPage {
  readonly page: Page;

  readonly linkmyAcount: Locator;
  readonly linkregister: Locator;
  readonly linkLogOut: Locator;
  readonly linkLogIn: Locator;
  readonly linkForgotPassword: Locator;
  readonly txtfirstName: Locator;
  readonly txtlastName: Locator;
  readonly txtemailAddress: Locator;
  readonly txtemailAddressForgotPassword: Locator;
  readonly txtemailAddressLogIn: Locator;
  readonly txttelefone: Locator;
  readonly txtpassword: Locator;
  readonly txtpasswordConfirm: Locator;
  readonly txtpasswordLogin: Locator;
  readonly chkTermsCondition: Locator;
  readonly btnContinue: Locator;
  readonly linkContinue: Locator;
  readonly btnContinueLogin: Locator;

  // Generate fake data
  private Name: string;
  private LASTNAME: string;
  private Email: string;
  private MobileTelefone: string;
  private Password: string;

  constructor(page: Page) {
    this.page = page;

    this.linkmyAcount = page.getByRole('link', { name: ' My Account' });
    this.linkregister = page.getByRole('link', { name: 'Register' });
    this.linkLogOut = page.locator('#top-links').getByRole('link', { name: 'Logout' });
    this.linkLogIn = page.locator('#top-links').getByRole('link', { name: 'Login' });
    this.linkForgotPassword = page.locator('#content').getByRole('link', { name: 'Forgotten Password' });
    this.txtfirstName = page.getByRole('textbox', { name: '* First Name' });
    this.txtlastName = page.getByRole('textbox', { name: '* Last Name' });
    this.txtemailAddress = page.getByRole('textbox', { name: '* E-Mail' });
    this.txtemailAddressForgotPassword = page.getByRole('textbox', { name: '* E-Mail Address' });
    this.txtemailAddressLogIn = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.txttelefone = page.getByRole('textbox', { name: '* Telephone' });
    this.txtpassword = page.getByRole('textbox', { name: '* Password', exact: true });
    this.txtpasswordConfirm = page.getByRole('textbox', { name: '* Password Confirm' });
    this.txtpasswordLogin = page.getByRole('textbox', { name: 'Password' });
    this.chkTermsCondition = page.getByRole('checkbox');
    this.btnContinue = page.getByRole('button', { name: 'Continue' });
    this.linkContinue = page.getByRole('link', { name: 'Continue' });
    this.btnContinueLogin = page.getByRole('button', { name: 'Login' });


     // Generate fake data
    this.Name = faker.person.firstName();
    this.LASTNAME = faker.person.lastName();
    this.Email = faker.internet.email();
    this.MobileTelefone = "3" + faker.string.numeric(9); //Colombian Style
    this.Password = faker.internet.password({ length: 8 });
  

  }
  
  async registerUser() {
    await this.linkmyAcount.click();
    await this.linkregister.click();
    await this.txtfirstName.click();
    await this.txtfirstName.fill(this.Name);
    await this.txtlastName.click();
    await this.txtlastName.fill(this.LASTNAME);
    await this.txtemailAddress.click();
    await this.txtemailAddress.fill(this.Email);
    await this.txttelefone.click();
    await this.txttelefone.fill(this.MobileTelefone);
    await this.txtpassword.click();
    await this.txtpassword.fill(this.Password);
    await this.txtpasswordConfirm.click();
    await this.txtpasswordConfirm.fill(this.Password);
    await this.chkTermsCondition.check();
    await this.btnContinue.click();
  }

  async forgotPassword() {
    await this.linkmyAcount.click();
    await this.linkLogOut.click();
    await this.linkContinue.click();
    await this.linkmyAcount.click();
    await this.linkLogIn.click();
    await this.linkForgotPassword.click();
    await this.txtemailAddressForgotPassword.click();
    await this.txtemailAddressForgotPassword.fill(this.Email);
    await this.btnContinue.click();
  }

  async login() {
    await this.linkmyAcount.click();
    await this.linkLogIn.click();
    await this.txtemailAddressLogIn.click();
    await this.txtemailAddressLogIn.fill(this.Email);
    await this.txtpasswordLogin.click();
    await this.txtpasswordLogin.fill(this.Password);
    await this.btnContinueLogin.click();
  }

}
