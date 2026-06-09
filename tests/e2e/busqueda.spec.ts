/**
 * TEST E2E: FLUJO DE BÚSQUEDA DE PRODUCTO
 * Objetivo: Simular la intención de compra de un usuario que busca 
 * un artículo específico mediante la navegación del menú.
 */
import { test, expect } from '@playwright/test';

test('El usuario puede navegar por el menú de Accesorios', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // Navegamos al apartado de Accesorios
  await page.click('nav >> text=Accesorios');
  
  // Verificamos que estamos en la sección correcta
  await expect(page).toHaveURL(/.*accesorios/);
  
  // Validamos que al menos un producto de accesorios sea visible
  const accesorio = page.locator('text=Collar Snake');
  await expect(accesorio).toBeVisible();
});