import { Page, Locator,} from '@playwright/test';


export class AddProductPage {
  readonly page: Page;

  readonly txtsearchProduct: Locator;
  readonly btnSearch: Locator;
  readonly linkselectProduct: Locator;
  readonly btnaddToCart: Locator;
  readonly linkaddToCart2: Locator;
  readonly inputQuantity: Locator;
  
  constructor(page: Page) {
    this.page = page;

    this.txtsearchProduct =page.getByRole('textbox', { name: 'Search' });
    this.btnSearch = page.getByRole('button', { name: '' });
    this.linkselectProduct = page.getByRole('link', { name: 'Samsung Galaxy Tab' }).first();
    this.btnaddToCart = page.getByRole('button', { name: 'Add to Cart' });
    this.linkaddToCart2 = page.getByRole('link', { name: 'MacBook Pro' }).first();
    this.inputQuantity = page.locator('input[name^="quantity["]');

  }
  
  //Utiliza la barra de búsqueda para encontrar una tablet Samsung Galaxy y agregala al carrito de compras.
  async addProduct() {
    await this.txtsearchProduct.click();
    await this.txtsearchProduct.fill('Samsung Galaxy');
    await this.btnSearch.click();
    await this.linkselectProduct.click();
    await this.btnaddToCart.waitFor({ state: 'visible' });
    await this.btnaddToCart.dblclick();
  }

  //Agrega otra unidad de la tablet Samsung Galaxy.
  async changeQuantity() {
    //await this.inputQuantity.click();
    await this.inputQuantity.clear();
    await this.inputQuantity.fill('2');
  }

  //Agreaga la macbook al carrito
   async addProduct2() {
    await this.linkaddToCart2.click();
    await this.btnaddToCart.waitFor({ state: 'visible' });
    await this.btnaddToCart.dblclick();
  }

}


