import { expect, Page } from '@playwright/test';
import { SecurePage } from '../pages/SecurePage';

export class SecurePageAssertions {

  static async validateSuccessfulRegistration(page: Page) {
    const securePage = new SecurePage(page);

    // Validar el texto "Congratulations! Your new"
    const successMessage = page.getByText('Congratulations! Your new');
    await successMessage.waitFor({ state: 'visible', timeout: 90000 });
    await expect(successMessage).toBeVisible();

    // Continuar con el flujo dando clic en el botón/link "Continue"
    const continueButton = page.getByRole('link', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();

  }

  static async validateSuccessChangePassword(page: Page) {
    const securePage = new SecurePage(page);

    //Validacion de cambio de password Exitoso
    const successMessage = page.getByText('Success: Your password has');
    await successMessage.waitFor({ state: 'visible', timeout: 90000 });
    await expect(successMessage).toBeVisible();

  }

  static async validateSuccessProductAdd(page: Page) {
    const securePage = new SecurePage(page);

    //Validacion de producto agregado con exito
    const successMessage = page.getByText('Success: You have added');
    await successMessage.waitFor({ state: 'visible', timeout: 90000 });
    await expect(successMessage).toBeVisible();

  }

  //Vaidacion de URL Correcta de vista de carrito de compras
  static async viewCart(page: Page) {
    const securePage = new SecurePage(page);

    const url = await securePage.getUrl();
    expect(url).toContain('http://opencart.abstracta.us/index.php?route=checkout/cart');

  }

  static async validateSuccessPurchase(page: Page) {
    const securePage = new SecurePage(page);

    //Validacion confirmacion de compra exitoso
    const successMessage = page.getByText('Your order has been successfully processed!');
    await successMessage.waitFor({ state: 'visible', timeout: 90000 });
    await expect(successMessage).toBeVisible();

  }

  static async validateSuccessForgotPassword(page: Page) {
    const securePage = new SecurePage(page);

    //Validacion confirmacion de restablecimiento de contraseña
    const successMessage = page.getByText('An email with a confirmation');
    await successMessage.waitFor({ state: 'visible', timeout: 90000 });
    await expect(successMessage).toBeVisible();

  }
  
}

