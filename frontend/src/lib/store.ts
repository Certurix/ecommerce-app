import { create } from 'zustand';

interface Product {
  id: string;
  nom: string;
  prix: number;
  image_url: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  loading: false,
  fetchCart: async () => {
    set({ loading: true });
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    set({ items: cart, loading: false });
  },
  addToCart: async (product, quantity) => {
    set({ loading: true });
    const cart = get().items;
    const existingItem = cart.find(item => item.product_id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id: Date.now().toString(), product_id: product.id, quantity, product });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    set({ items: cart, loading: false });
  },
  removeFromCart: async (productId) => {
    set({ loading: true });
    const cart = get().items.filter(item => item.product_id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    set({ items: cart, loading: false });
  },
  updateQuantity: async (productId, quantity) => {
    set({ loading: true });
    const cart = get().items;
    const item = cart.find(item => item.product_id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        get().removeFromCart(productId);
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        set({ items: cart, loading: false });
      }
    }
  },
}));

interface User {
  id: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, loading: false });
    } catch (error) {
      console.error('Error signing in:', error);
      set({ loading: false });
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, loading: false });
    } catch (error) {
      console.error('Error signing up:', error);
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sign out');
      }

      localStorage.removeItem('user');
      set({ user: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },
}));

// Initialize auth state
(async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      useAuthStore.setState({ user, loading: false });
    } else {
      useAuthStore.setState({ loading: false });
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
    useAuthStore.setState({ loading: false });
  }
})();