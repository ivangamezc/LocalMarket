import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Ejecuta tests en paralelo */
  fullyParallel: true,
  /* Falla la build en CI si se queda un test.only en el código */
  forbidOnly: !!process.env.CI,
  /* Reintentos en CI para mitigar problemas de red */
  retries: process.env.CI ? 2 : 0,
  /* Control de workers en entornos virtuales */
  workers: process.env.CI ? 1 : undefined,
  /* Formato del reporte */
  reporter: 'html',
  
  use: {
    /* CLAVE: En GitHub Actions apunta a Vercel; en tu PC apunta a localhost */
    baseURL: process.env.CI 
      ? 'https://localmarket-cinco.vercel.app' 
      : 'http://localhost:4321',

    /* Graba trazas de ejecución en fallos para poder revisarlos en la interfaz */
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

  /* El servidor local SOLO se activará en tu PC. En GitHub Actions se cancela por completo */
  webServer: process.env.CI ? undefined : {
    command: 'pnpm dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 60 * 1000,
  },
});