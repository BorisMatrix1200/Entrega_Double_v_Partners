import { test, expect } from '@playwright/test';
import lighthouse, { Flags, RunnerResult } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'fs';
import path from 'path';

test('Auditoría de accesibilidad y rendimiento Lighthouse', async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options: Flags = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility'],
    port: chrome.port,
  };

  const runnerResult: RunnerResult | undefined = await lighthouse(
    'https://opencart.abstracta.us/',
    options
  );

  if (!runnerResult) {
    throw new Error('⚠️ Lighthouse no generó resultados');
  }

  const performance = (runnerResult.lhr.categories.performance.score ?? 0) * 100;
  const accessibility = (runnerResult.lhr.categories.accessibility.score ?? 0) * 100;

  console.log('Performance score:', performance);
  console.log('Accessibility score:', accessibility);

  writeFileSync('lighthouse-report.html', runnerResult.report as string);

  expect(performance).toBeGreaterThanOrEqual(20);
  expect(accessibility).toBeGreaterThanOrEqual(60);

  await chrome.kill();

  //Codigo para almacenar el reporte en una carpeta especifica, pero al ejecutar el codigo para abrirlo no lo reconoce
  /*const reportPath = path.join(__dirname, '..', 'reports', `lighthouse-report.html`);
  writeFileSync(reportPath, runnerResult.report as string);*/


});

//Comandos para ejecutar el test por sonsola en bash
//npx playwright test tests/auditoriaLighthouse.spec.ts

//Abrir el reporte en HTML 
//start lighthouse-report.html

//start reports\lighthouse-report.html
