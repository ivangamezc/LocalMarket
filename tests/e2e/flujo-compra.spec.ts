import { test, expect } from '@playwright/test';

test.describe('E2E - Tienda Pública LocalMarket', () => {

  test('Navegación del cliente: Home -> Categoría -> Ficha de Producto', async ({ page }) => {
    
    // 1. El cliente entra a la portada de la tienda
    await page.goto('http://localhost:4321/');

    // Verificamos que la página cargó bien buscando tu logo o texto principal
    // (Ajusta 'LOCAL MARKET' si tu logo es una imagen sin texto)
    await expect(page).toHaveTitle(/LocalMarket/i); 

    // 2. El cliente hace clic en el enlace del menú de navegación
    await page.click('text=Calzado');

    // Le damos un segundito a Astro para que haga su transición (View Transitions)
    await page.waitForTimeout(1000);

    // 3. El cliente busca unas zapatillas específicas de tu catálogo y hace clic
    // Basado en la captura de tu BD, sabemos que tienes estas zapatillas:
    await page.click('text=Nike Air Max Pulse');

    // 4. Comprobamos que estamos en la ficha correcta viendo si el precio aparece en pantalla
    // En tu BD, estas zapatillas cuestan 160.00€
    const bodyText = page.locator('body');
    await expect(bodyText).toContainText('160');

    // 5. OPCIONAL: Si tienes botón de carrito, le daría clic así:
    // await page.click('text=Añadir al carrito');
    // await expect(page.locator('.contador-carrito')).toHaveText('1');
  });

});