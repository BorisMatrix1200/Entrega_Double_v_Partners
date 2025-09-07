// Importa el módulo HTTP de K6 para poder hacer peticiones GET, POST, PUT, etc.
import http from 'k6/http';

// Importa utilidades de K6: "check" para validaciones y "sleep" para pausas entre requests
import { check, sleep } from 'k6';

// Configuración de opciones y escenarios de prueba
export let options = {
  scenarios: {
    // Escenario 1: Prueba Funcional (se ejecuta una sola vez por cada VU)
    functional: {
      executor: 'per-vu-iterations', // ejecuta un número fijo de iteraciones por VU
      vus: 1,                        // 1 usuario virtual
      iterations: 1,                 // 1 iteración en total
      exec: 'functionalTests',       // función a ejecutar
    },
    // Escenario 2: Prueba de Carga (150 usuarios durante 2 minutos)
    load_test: {
      executor: 'constant-vus',      // mantiene un número constante de usuarios
      vus: 150,                      // 150 usuarios virtuales
      duration: '2m',                // ejecuta por 2 minutos
      exec: 'loadTests',             // función a ejecutar
      startTime: '10s',              // inicia 10 segundos después del funcional
    },
    // Escenario 3: Prueba de Estrés (de 100 a 1000 usuarios en escalada)
    stress_test: {
      executor: 'ramping-vus',       // simula usuarios incrementando progresivamente
      startVUs: 0,                   // inicia en 0 usuarios
      stages: [                      // define las fases de incremento
        { duration: '30s', target: 100 },
        { duration: '30s', target: 250 },
        { duration: '30s', target: 400 },
        { duration: '30s', target: 550 },
        { duration: '30s', target: 700 },
        { duration: '30s', target: 850 },
        { duration: '30s', target: 1000 },
      ],
      gracefulRampDown: '30s',       // da 30s para cerrar sesiones activas al final
      exec: 'stressTests',           // función a ejecutar
      startTime: '2m20s',            // arranca después del load test
    },
  },
};

// ---------- PRUEBAS FUNCIONALES ----------
export function functionalTests() {
  // 1. Consulta productos de la categoría "electronics"
  let electronics = http.get('https://fakestoreapi.com/products/category/electronics');
  check(electronics, { 'GET electronics -> 200': (r) => r.status === 200 });

  // 2. Consulta un producto específico (ej: id 1)
  let product = http.get('https://fakestoreapi.com/products/1');
  check(product, { 'GET product 1 -> 200': (r) => r.status === 200 });

  // 3. Crear un producto nuevo (POST)
  let createRes = http.post(
    'https://fakestoreapi.com/products',
    JSON.stringify({
      title: 'Laptop QA Test',
      price: 999.99,
      description: 'Laptop creada en prueba técnica con K6',
      image: 'https://i.pravatar.cc',
      category: 'electronics',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(createRes, { 'POST create -> 200/201': (r) => r.status === 200 || r.status === 201 });

  // Parsear respuesta JSON y extraer ID del producto creado
  let newProduct = JSON.parse(createRes.body);
  console.log(`Producto creado con ID: ${newProduct.id}`);

  // 4. Actualizar la imagen del producto creado (PUT)
  let updateRes = http.put(
    `https://fakestoreapi.com/products/${newProduct.id}`,
    JSON.stringify({ image: 'https://newimage.com/product-test.jpg' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(updateRes, { 'PUT update -> 200': (r) => r.status === 200 });

  // Pausa de 1 segundo para simular espera de usuario
  sleep(1);
}

// ---------- PRUEBAS DE CARGA ----------
export function loadTests() {
  // Ejecuta en paralelo un GET y un POST
  let res = http.batch([
    ['GET', 'https://fakestoreapi.com/products'], // obtener todos los productos
    ['POST', 'https://fakestoreapi.com/products', // crear un nuevo producto
      JSON.stringify({
        title: 'Load Test Product',
        price: 10.5,
        description: 'Cargado en test de carga',
        image: 'https://i.pravatar.cc',
        category: 'electronics',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    ],
  ]);

  // Validaciones de status code
  check(res[0], { 'GET all products -> 200': (r) => r.status === 200 });
  check(res[1], { 'POST new product -> 200/201': (r) => r.status === 200 || r.status === 201 });

  // Pausa de 1 segundo
  sleep(1);
}

// ---------- PRUEBAS DE ESTRÉS ----------
export function stressTests() {
  // Consulta todos los productos bajo alta concurrencia
  let res = http.get('https://fakestoreapi.com/products');
  check(res, { 'Stress GET -> 200': (r) => r.status === 200 });

  // Pausa de 1 segundo
  sleep(1);
}

//Comando para ejecutar las pruebas en Terminal
//k6 run fakestore_test.js