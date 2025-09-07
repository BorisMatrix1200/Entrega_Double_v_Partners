import { Page, Locator,} from '@playwright/test';


export class ViewCartPage {
  readonly page: Page;

  readonly btnCart: Locator;
  readonly linkViewCart: Locator;
  readonly btnDeleteProduct: Locator;

  
  constructor(page: Page) {
    this.page = page;

    this.btnCart =page.getByRole('button', { name: /item\(s\) - \$/ });
    this.linkViewCart =  page.getByRole('link', { name: ' View Cart' });
    this.btnDeleteProduct = page.getByRole('button', { name: '' }).first();

  }
  
  async deleteProduct() {
    await this.btnCart.click();
    await this.linkViewCart.click();
    await this.btnDeleteProduct.click();
  }

}
