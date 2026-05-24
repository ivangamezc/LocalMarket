import { atom, computed } from 'nanostores';
import confetti from 'canvas-confetti'; 

const initialCart = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]') 
    : [];

export const cartItems = atom(initialCart);

cartItems.subscribe(newItems => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(newItems));
  }
});

export const cartTotal = computed(cartItems, items => {
  return items.reduce((total, item) => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = item.cantidad || 1;
    return total + (precio * cantidad);
  }, 0);
});

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

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#facc15', '#ffffff', '#000000'],
    zIndex: 999
  });

  if (typeof document !== 'undefined') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.remove('opacity-0', 'translate-y-10');
      toast.classList.add('opacity-100', 'translate-y-0');
      
      setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-10');
      }, 2500);
    }
  }
}

export function removeCartItem(index) {
  const currentItems = cartItems.get();
  const newItems = currentItems.filter((_, i) => i !== index);
  cartItems.set(newItems);
}

export function clearCart() {
  cartItems.set([]);
}

// NUEVO: Función para modificar cantidad (+ y -)
export function updateCartItemQuantity(index, change) {
  const currentItems = cartItems.get();
  const newItems = [...currentItems];

  // Sumamos o restamos la cantidad indicada
  newItems[index].cantidad = (newItems[index].cantidad || 1) + change;

  // Si la cantidad baja a 0, eliminamos el producto del carrito
  if (newItems[index].cantidad <= 0) {
    newItems.splice(index, 1);
  }

  cartItems.set(newItems);
}