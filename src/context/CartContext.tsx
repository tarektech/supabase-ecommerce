import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { ProductType } from '../types';

// Define CartItem interface here since it's only used for frontend cart functionality
export interface CartItem extends ProductType {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log('Cart items updated:', cartItems);

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);

    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(itemCount);
  }, [cartItems]);

  const addToCart = (product: ProductType) => {
    console.log('Adding to cart:', product);

    setCartItems((prev) => {
      // Check if the item is already in the cart
      const productId = product.product_id;
      const existingItemIndex = prev.findIndex(
        (item) => item.product_id === productId
      );

      // If the item is already in the cart, increase its quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      }

      // Otherwise, add the new item to the cart
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    console.log('Removing item from cart:', productId);

    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  };

  const updateQuantity = (productId: string, amount: number) => {
    console.log('Updating quantity:', { productId, amount });

    setCartItems((prev) => {
      // If decreasing quantity and item would reach 0, remove it
      if (amount < 0) {
        const item = prev.find((item) => item.product_id === productId);
        if (item && item.quantity + amount <= 0) {
          return prev.filter((item) => item.product_id !== productId);
        }
      }

      return prev.map((item) => {
        // Compare using string values
        if (item.product_id === productId) {
          const newQuantity = Math.max(1, item.quantity + amount);
          console.log(
            `Updating item ${item.title} quantity: ${item.quantity} -> ${newQuantity}`
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
