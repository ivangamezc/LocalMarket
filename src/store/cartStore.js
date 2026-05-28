import { atom, computed } from 'nanostores';
import confetti from 'canvas-confetti'; 

// 1. Inicialización segura
const initialCart = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]') 
    : [];

export const cartItems = atom(initialCart);

// 2. Persistencia automática
cartItems.subscribe(newItems => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(newItems));
  }
});

// 3. Total calculado
export const cartTotal = computed(cartItems, items => {
  return items.reduce((total, item) => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = item.cantidad || 1;
    return total + (precio * cantidad);
  }, 0);
});

// 4. Funciones de acción
export function addCartItem(item) {
  const currentItems = cartItems.get();
  const existingItemIndex = currentItems.findIndex(i => i.id === item.id);

  if (existingItemIndex > -1) {
    const newItems = [...currentItems];
    newItems[existingItemIndex].cantidad = (newItems[existingItemIndex].cantidad || 1) + 1;
    cartItems.set(newItems);
  } else {
    cartItems.set([...currentItems, { ...item, cantidad: 1 }]);
  }

  // Efecto visual
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#facc15', '#ffffff', '#000000'],
    zIndex: 999
  });
}

export function removeCartItem(index) {
  const currentItems = cartItems.get();
  const newItems = currentItems.filter((_, i) => i !== index);
  cartItems.set(newItems);
}

export function updateCartItemQuantity(index, change) {
  const currentItems = cartItems.get();
  const newItems = [...currentItems];

  if (newItems[index]) {
    newItems[index].cantidad = (newItems[index].cantidad || 1) + change;
    
    if (newItems[index].cantidad <= 0) {
      newItems.splice(index, 1);
    }
    cartItems.set(newItems);
  }
}

export function clearCart() {
  cartItems.set([]);
}