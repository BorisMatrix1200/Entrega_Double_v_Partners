import { Page, Locator,} from '@playwright/test';


export class NavigateTo {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL() {
    //Ambiente al que se desea navegar QA, DEV o PROD
    await this.page.goto('https://opencart.abstracta.us/');
  }


}