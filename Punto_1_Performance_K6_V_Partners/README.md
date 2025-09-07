# API Testing con K6 – Your Store

Este proyecto valida las funcionalidades críticas de la tienda en línea **Your Store** mediante **pruebas de API automatizadas con K6**.  
El objetivo es asegurar que el backend esté listo antes de que el front-end esté completamente implementado, y garantizar que el sistema soporte cargas y estrés de usuarios concurrentes.

====================================

## Contenido
1. [API Testing](#-api-testing)  
2. [Requerimientos de la prueba](#-requerimientos-de-la-prueba)  
3. [Validación funcional](#-validación-funcional)  
4. [Herramienta para el testing](#-herramienta-para-el-testing)  
5. [Guía de instalación de Visual Studio Code](#-guía-de-instalación-de-visual-studio-code)  
6. [Guía de instalación de K6 en Visual Studio Code](#-guía-de-instalación-de-k6-en-visual-studio-code)  
7. [Casos de prueba](#-casos-de-prueba)  
8. [Informe de ejecución](#-informe-de-ejecución)  

=====================================

## API Testing
La tienda en línea **Your Store** está desarrollando una nueva versión de su sitio web.  
Para garantizar que las funcionalidades críticas estén listas, el equipo de QA validó estas funcionalidades directamente contra la **API**:  
📄 Documentación oficial: [https://fakestoreapi.com/docs](https://fakestoreapi.com/docs)  

=====================================

## Requerimientos de la prueba
Como **administrador de Your Store**, se necesita realizar acciones sobre la API para gestionar los productos de forma eficiente:

1. Consultar todos los productos de la categoría **electronics**.  
2. Consultar los datos de un producto específico.  
3. Crear un producto nuevo.  
4. Actualizar la imagen de un producto creado.  
5. Simular **150 usuarios concurrentes** durante 2 minutos contra los endpoints de:  
   - Listar todos los productos.  
   - Agregar un nuevo producto.  
6. Escalar el número de usuarios concurrentes desde **100 hasta 1000 en intervalos de 150**.  

=====================================

## Validación funcional
Los endpoints probados son:  

- `GET /products/category/electronics`  
- `GET /products/{id}`  
- `POST /products`  
- `PUT /products/{id}`  
- `GET /products`  
- `POST /products` (carga y estrés)  

======================================

## 🛠 Herramienta para el testing
La herramienta seleccionada es **[K6](https://k6.io/)** por:  
- Ligereza y rapidez.  
- Scripting en **JavaScript/TypeScript**.  
- Soporte de **escenarios avanzados**.  
- **Validaciones funcionales** integradas.  
- Integración con **CI/CD** y **Grafana/InfluxDB**.  
- Open Source y gratuita.  

======================================

## Guía de instalación de Visual Studio Code
1. Descargar instalador en [https://code.visualstudio.com/](https://code.visualstudio.com/).  
2. Ejecutar `VSCodeSetup-x64.exe`.  
3. Opciones recomendadas:  
   - Agregar a PATH  
   - Registrar como editor  
   - “Abrir con Code” en menú contextual  
4. Finalizar instalación → abrir VS Code.  
5. Verificar instalación:  
   ```bash
   code --version
=======================================
## Autor: Boris Velez
## Email: bavelch.0328@gmail.com
