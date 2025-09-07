import { AddProductPage } from '../pages/AddProductPage.ts';
import { RegisterPage } from '../pages/RegisterPage.ts';
import { NavigateTo } from '../pages/NavigateTo.ts';
import { ConfirmPurchasePage} from '../pages/ConfirmPurchasePage.ts';
import { SecurePageAssertions } from '../assertions/SecurePageAssertions.ts';
import { takeStepScreenshot } from '../utils/screenshotHelper.ts';
import { test } from '@playwright/test';
import { NavigateToMenuPage } from '../pages/NavigateToMenuPage.ts';
import { ViewCartPage } from '../pages/ViewCartPage.ts';

test.describe('Purchase Flow', () => {

  test('Purchase Flow Complete', async ({ page }) => {
    test.setTimeout(90000); // este test tendrá hasta 60s
    
    const navigateTo = new NavigateTo(page);
    const navigateToMenu = new NavigateToMenuPage(page);
    const addProductPage = new AddProductPage(page);
    const registertPage = new RegisterPage(page);
    const viewCartPagePage = new ViewCartPage(page);
    const confirmPurchase = new ConfirmPurchasePage(page);


    await test.step('Add product', async () => {
      await navigateTo.navigateToURL();
      await takeStepScreenshot(page, '01-Navigate To');
    });

    await test.step('Register user', async () => {
      await registertPage.registerUser();
      await SecurePageAssertions.validateSuccessfulRegistration(page)
      await takeStepScreenshot(page, '02-Register User');
    });

    await test.step('Forgotten Password', async () => {
      await registertPage.forgotPassword();
      await SecurePageAssertions.validateSuccessForgotPassword(page)
      await takeStepScreenshot(page, '03-Test Forgot Password');
    });

    await test.step('Login', async () => {
      await registertPage.login();
      await takeStepScreenshot(page, '04-Login');
    });

     await test.step('Add product to cart', async () => {
      await navigateToMenu.navigateMenuTo();
      await addProductPage.addProduct2();
      await SecurePageAssertions.validateSuccessProductAdd(page)
      await takeStepScreenshot(page, '05-Add prodruct');
    });

    await test.step('Search product', async () => {
      await addProductPage.addProduct();
      await takeStepScreenshot(page, '06-Searh product add');
    });

     await test.step('View cart and delete product', async () => {
      await viewCartPagePage.deleteProduct();
      await SecurePageAssertions.viewCart(page)
      await takeStepScreenshot(page, '07-Delete product cart');
    });

    await test.step('Change quantity product', async () => {
      await addProductPage.changeQuantity();
      await takeStepScreenshot(page, '08-Change quantity product cart');
    });

    await test.step('Confirm purchase', async () => {
      await confirmPurchase.confirmPurchase();
      await SecurePageAssertions.validateSuccessPurchase(page)
      await takeStepScreenshot(page, '09-Confirm purchase');
    });

  });

});

  
//Comando para ajecutar las pruebas
//npx playwright test

//Comando para ejecutar un test en especifico
//npx playwright test tests/test_Double_Partners.spec.ts

// Comandos para generar el reporte
//npx allure generate ./allure-results --clean -o ./allure-report

//Comando para abrir el reporte
//npx allure open ./allure-report

//Comando para borrar, ejecutar, crear y abrir el reporte
//npm run allure:clean && npm run test && npm run allure:generate && npm run allure:open