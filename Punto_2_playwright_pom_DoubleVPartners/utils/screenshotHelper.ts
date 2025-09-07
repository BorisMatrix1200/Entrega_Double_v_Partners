import { Page } from '@playwright/test';

export async function takeStepScreenshot(page: Page, stepName: string) {
  await page.screenshot({ path: `screenshots/${stepName}.png`, fullPage: true });
}
