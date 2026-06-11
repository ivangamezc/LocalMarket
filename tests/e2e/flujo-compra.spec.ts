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

    // BEST PRACTICE: Wait explicitly for the state update or reactive badge count change.
    // This gives your Astro client islands time to re-render layout shifts cleanly.
    const badgeCarrito = menuSuperior.getByText('1');
    await expect(badgeCarrito).toBeVisible();

    // ==========================================
    // 5. NAVEGACIÓN A LA PÁGINA DEL CARRITO
    // ==========================================
    // Rely on accessible locator roles relative to your upper menu
    const botonIrAlCarrito = menuSuperior.getByRole('link', { name: /🛒/ });
    await expect(botonIrAlCarrito).toBeVisible();
    await botonIrAlCarrito.click();

    await expect(page).toHaveURL(/\/carrito/i);

    // ==========================================
    // 6. VERIFICACIÓN DENTRO DEL CARRITO
    // ==========================================
    await expect(page.locator('body')).toContainText('Nike Air Max Pulse');
    await expect(page.locator('body')).toContainText('160');
  });

});