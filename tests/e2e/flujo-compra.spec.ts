import { test, expect } from '@playwright/test';

test.describe('E2E - Tienda Pública LocalMarket', () => {

  test('Flujo de compra completo: Añadir al carrito y verificar página de carrito', async ({ page }) => {
    
    // 1. Navegación inicial
    await page.goto('/');

    // 2. Ir a Calzado filtrando por el menú superior
    const menuSuperior = page.getByRole('navigation', { name: 'Navegación principal' });
    await menuSuperior.getByRole('link', { name: 'Calzado', exact: true }).click();
    await expect(page).toHaveURL(/\/calzado/i);

    // 3. Entrar a la ficha del producto específico
    await page.locator('text=Nike Air Max Pulse').first().click();
    await expect(page).toHaveURL(/\/productos\/|.*13.*/);
    await expect(page.getByRole('heading', { name: 'Nike Air Max Pulse', level: 1 })).toBeVisible();
    
    // ==========================================
    // 4. AÑADIR AL CARRITO
    // ==========================================
    const botonAñadir = page.getByRole('button', { name: /añadir al carrito/i });
    await botonAñadir.click();

    // Esperamos a que el badge del carrito dentro del menú superior cambie a '1'
    const badgeCarrito = menuSuperior.getByText('1');
    await expect(badgeCarrito).toBeVisible();

    // ==========================================
    // 5. NAVEGACIÓN A LA PÁGINA DEL CARRITO
    // ==========================================
    // Buscamos el enlace a /carrito que está ÚNICAMENTE dentro de la navegación principal
    const botonIrAlCarrito = page.getByRole('navigation', { name: 'Navegación principal' })
                                 .locator('a[href="/carrito"]');
    
    await botonIrAlCarrito.click();
    await expect(page).toHaveURL(/\/carrito/i);

    // ==========================================
    // 6. VERIFICACIÓN DENTRO DEL CARRITO
    // ==========================================
    await expect(page.locator('body')).toContainText('Nike Air Max Pulse');
    await expect(page.locator('body')).toContainText('160');
  });

});