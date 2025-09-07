
================================
# Prueba Técnica - Double V Partners
================================

Este proyecto corresponde a la **automatización del flujo de compra** en [AutomationExercise](https://opencart.abstracta.us/) utilizando **Playwright** con el patrón **Page Object Model (POM)**.  
Incluye pruebas de **funcionalidad, accesibilidad y rendimiento**, con reportería en **Allure** y **Lighthouse**.

===========================================================================

## Framework Utilizado
- **Playwright**
  - Escalable y con soporte multi-navegador.
  - Permite ejecuciones paralelas de forma nativa.
  - Respaldado por Microsoft, con mantenimiento activo.
  - Ideal para flujos complejos de compra, formularios y modales.

===========================================================================

## Requisitos Previos
- Node.js **v18 o superior**
- Visual Studio Code u otro IDE
- Acceso a línea de comandos (CLI)

===========================================================================

## Instalación y Ejecución

### 1. Clonar el proyecto
```bash
git clone URLLLLLLL FALTAAAAAA
cd carpeta del proyecto
```

### 2. Instalar dependencias
```bash
npm install
npx playwright install
```

### 3. Ejecutar pruebas
```bash
npx playwright test
```

### 4. Generar y abrir reporte Allure
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open
```

============================================================================

## Estructura del Proyecto
```
La estructura de carpetas es la siguiente:
•	pages/: contiene los objetos de página
  - AddProductPage.ts
  - ConfirmPurchasePage.ts
  - NavigateTo.ts
  - NavigateToMenuPage.ts
  - RegisterPage.ts
  - SecurePage.ts
  - ViewCartPage.ts
•	assertions/: validaciones específicas de todo el flujo:
  - SecurePageAssertions.ts
•	tests/: contiene el archivo que ejecuta el flujo:
  - test_Double_Partners.spec.ts
  - auditoriaLighthouse.spec.ts
•	utils/: funcionalidades auxiliares como capturas:
  - screenshotHelper.ts
•	screenshots/: imágenes generadas por cada paso
•	allure-results/ y allure-report/: carpetas para reportería con allure reports
•	playwright.config.ts: configuración general del entorno de pruebas.
•	Gitignore: archivos que no se desean subir al repositorio Github
•	lighthouse-report.html: Muestra el reporte de las pruebas de rendimiento y accesibilidad.


=============================================================================

## Resultados

- **Capturas de pantalla** del flujo completo en `/screenshots`
- **Reporte Allure** interactivo disponible tras ejecución
- **Reporte Lighthouse** para rendimiento y accesibilidad

==============================================================================

## Caso de Prueba (Gherkin)

```gherkin
Feature: Automatización de flujos críticos 
Background:
    Given que el usuario accede al sitio https://opencart.abstracta.us/

  Scenario: Registro de usuario exitoso
    Given que el usuario navega a la página de registro desde "My Account > Register"
    When completa todos los campos obligatorios del formulario
      And acepta los términos y condiciones
      And hace clic en "Continue"
    Then debería ver el mensaje "Your Account Has Been Created!"

  Scenario: Inicio de sesión exitoso
    Given que el usuario tiene una cuenta registrada
    When navega a "My Account > Login"
      And ingresa credenciales válidas
      And hace clic en "Login"
    Then debería ser redirigido al "My Account Dashboard"

  Scenario: Restablecimiento de contraseña
    Given que el usuario tiene una cuenta registrada
    When navega a "My Account > Login > Forgotten Password"
      And ingresa su correo registrado
      And hace clic en "Continue"
    Then debería ver el mensaje "An email with a confirmation link has been sent your email address."

  Scenario: Navegar a la sección Show all laptops & notebooks
    Given que el usuario está en la página principal
    When navega a "Laptops & Notebooks > Show all laptops & notebooks"
    Then debería ver el listado de todos los productos de la categoría

  Scenario: Agregar MacBook Pro al carrito
    Given que el usuario navega a la sección "Laptops & Notebooks"
    When selecciona el producto "MacBook Pro"
      And hace clic en "Add to Cart"
    Then debería ver el mensaje "Success: You have added MacBook Pro to your shopping cart!"


  Scenario: Buscar y agregar Samsung Galaxy Tablet al carrito
    Given que el usuario está en la página principal
    When busca el producto "Samsung Galaxy" en la barra de búsqueda
      And selecciona el producto de la lista de resultados
      And hace clic en "Add to Cart"
    Then debería ver el mensaje de confirmación de que el producto fue agregado al carrito

  Scenario: Eliminar MacBook Pro del carrito
    Given que el usuario tiene el producto "MacBook Pro" en el carrito
    When navega al carrito de compras
      And elimina el producto "MacBook Pro"
    Then el producto ya no debería aparecer en el carrito
      And el total debería actualizarse correctamente

  Scenario: Agregar otra unidad de Samsung Galaxy Tablet
    Given que el usuario tiene "Samsung Galaxy Tablet" en el carrito
    When cambia la cantidad de 1 a 2
      And hace clic en "Update"
    Then el carrito debería mostrar 2 unidades de "Samsung Galaxy Tablet"
      And el precio total debería actualizarse correctamente

  Scenario: Completar proceso de compra
    Given que el usuario tiene productos en el carrito
    When hace clic en "Checkout"
      And completa los datos de facturación, entrega y método de pago
      And confirma la orden
    Then debería ver el mensaje "Your order has been placed!"

```

===============================================================================

## Pruebas de Accesibilidad y Rendimiento
- Dependencias:  
  ```bash
  npm install --save-dev playwright @playwright/test lighthouse chrome-launcher
  ```
- Reporte Lighthouse disponible en:  
  - `lighthouse-report.html` (abrir en el navegador)
  - `start lighthouse-report.html` (por CLI en Windows)

================================================================================

## Resultados de Lighthouse
- Resultados por categoría:
Performance: (64/100 – Nivel Medio)
Métricas principales:
-	First Contentful Paint (FCP): 3.3 s (mejorable)
-	Largest Contentful Paint (LCP): 3.6 s (aceptable, objetivo < 2.5s)
-	Total Blocking Time (TBT): 10 ms (muy bueno)
-	Cumulative Layout Shift (CLS): 0.103 (bueno, objetivo < 0.1)
-	Speed Index: 6.4 s (alto, necesita optimización)
Oportunidades de mejora:
-	Recursos bloqueando renderizado (ahorro estimado 2.1 s).
-	Migrar a HTTP/2 (33 requests no servidos por HTTP/2).
-	Configurar font-display para evitar bloqueos de fuentes (ahorro 1.1 s).
-	Implementar caché eficiente (ahorro estimado 511 KiB).
-	Optimizar entrega de imágenes (ahorro estimado 242 KiB).
-	Minificar y reducir JS/CSS sin uso.
Fortaleza: Bajo tiempo de bloqueo (TBT).
Debilidad: Velocidad de renderizado y optimización de imágenes/recursos, con esta debilidad es posible que la automatización sufra fluctuaciones a la hora de ejecutar los casos de prueba descritos.

Accessibility
Puntaje: 64/100 – Bajo.
Problemas detectados:
-	Botones sin nombre accesible.
-	Links sin texto discernible.
-	Contraste insuficiente en colores de fondo y texto.
-	Links solo diferenciados por color.
-	Estructura de encabezados incorrecta (no secuencial).
-	Tamaño insuficiente de touch targets (difícil en dispositivos móviles).
Recomendaciones:
-	Añadir aria-label y textos alternativos claros.
-	Revisar paleta de colores para cumplir con WCAG AA.
-	Asegurar jerarquía correcta de encabezados (h1 > h2 > h3).
-	Aumentar tamaño y espacio en botones e íconos interactivos. 

================================================================================

## Conclusiones
- -	El sitio presenta desempeño aceptable en TBT y CLS, pero necesita mejoras en rendimiento visual (FCP, LCP, Speed Index), esto también afecta la automatización de pruebas, haciendo que algunos casos presenten fallos por TimeOut.
-	Accesibilidad es el punto más crítico (64/100). Afecta directamente la experiencia de usuarios con limitaciones visuales o que navegan en móvil.
-	Se identificaron oportunidades claras: optimización de imágenes, migración a HTTP/2, y mejora de contraste y labels accesibles.
-	Con estas optimizaciones, el puntaje de Performance podría subir a +85/100 y el de Accessibility a +90/100.  

========================
Autor: **Andres Velez**  
bavelch.0328@gmail.com
========================
