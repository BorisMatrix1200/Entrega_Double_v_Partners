import { Page, Locator,} from '@playwright/test';


export class NavigateToMenuPage {
  readonly page: Page;

  readonly linkMenu: Locator;
  readonly linkSubMenu: Locator;
  
  constructor(page: Page) {
    this.page = page;

    this.linkMenu =page.getByRole('link', { name: 'Laptops & Notebooks', exact: true });
    this.linkSubMenu = page.getByRole('link', { name: 'Show All Laptops & Notebooks' });

  }
  
 //Agrega al carrito de compras un portátil MacBook Pro.
  async navigateMenuTo() {
    await this.linkMenu.click();
    await this.linkSubMenu.click();
  }

}