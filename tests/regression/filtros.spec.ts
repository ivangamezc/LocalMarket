import { test, expect } from '@playwright/test';

test('Navegación a la categoría Ropa', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // SOLUCIÓN: Usamos un selector jerárquico. 
  // 'nav a[href="/ropa"]' le dice: "Busca un enlace dentro del NAV".
  // .first() le dice: "Si encuentras más de uno en el nav, quédate con el primero".
  const linkRopa = page.locator('nav a[href="/ropa"]').first();
  
  // Forzamos el clic en ese elemento específico
  await linkRopa.click();
  
  // Esperamos a estar en la página de ropa
  await page.waitForURL('**/ropa');
  
  // Verificamos el contenido
  const productoRopa = page.locator('text=Nike Tech T-Shirt');
  await expect(productoRopa).toBeVisible({ timeout: 5000 });
});