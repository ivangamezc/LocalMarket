import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Ejecuta tests en paralelo */
  fullyParallel: true,
  /* Falla la build en CI si se te olvida un test.only en el código */
  forbidOnly: !!process.env.CI,
  /* Reintentos solo en CI (un reintento para evitar falsos positivos por transiciones) */
  retries: process.env.CI ? 1 : 0,
  /* Desactiva paralelismo masivo en CI para no saturar el contenedor */
  workers: process.env.CI ? 1 : undefined,
  /* Reporte en formato HTML */
  reporter: 'html',
  
  use: {
    /* URL base relativa para usar comandos como `await page.goto('/')` */
    baseURL: 'http://localhost:4321',

    /* Captura trazas en el primer reintento fallido para debuguear */
    trace: 'on-first-retry',
  },

  /* Configuramos los proyectos para los navegadores principales */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Levanta el servidor de Astro automáticamente antes de lanzar los tests */
  /* Levanta el servidor de producción optimizado antes de lanzar los tests */
  webServer: {
    command: 'pnpm preview',               // Cambiado de dev a preview
    url: 'http://localhost:4321',          // Asegúrate de que preview use este puerto en tu package.json
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
});