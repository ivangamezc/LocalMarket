import { atom } from 'nanostores';
import confetti from 'canvas-confetti'; // Importamos la librería

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

  // --- EFECTO DE CONFETI ---
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#facc15', '#ffffff', '#000000'], // Los colores de tu marca
    zIndex: 999
  });

  // --- LÓGICA DEL AVISO FLOTANTE (Toast) ---
  if (typeof document !== 'undefined') {
    const toast = document.getElementById('toast');
    if (toast) {
      // Lo hacemos aparecer
      toast.classList.remove('opacity-0', 'translate-y-10');
      toast.classList.add('opacity-100', 'translate-y-0');
      
      // Lo ocultamos a los 2.5 segundos
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
