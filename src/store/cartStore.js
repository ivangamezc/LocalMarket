import { atom } from 'nanostores';

// 1. Recuperar datos previos de localStorage
const initialCart = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]') 
    : [];

export const cartItems = atom(initialCart);

// 2. Guardar automáticamente cada vez que cambie
cartItems.subscribe(newItems => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(newItems));
  }
});

// 3. Función para añadir
export function addCartItem(item) {
  const currentItems = cartItems.get();
  cartItems.set([...currentItems, item]);
}


export function removeCartItem(index) {
  const currentItems = cartItems.get();
  const newItems = currentItems.filter((_, i) => i !== index);
  cartItems.set(newItems);
}