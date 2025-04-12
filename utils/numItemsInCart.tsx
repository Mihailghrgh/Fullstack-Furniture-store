// CartContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface CartResponse {
  numItemsInCart: number;
}

interface CartContextType {
  numItemsInCart: number;
  setNumItemsInCart: React.Dispatch<React.SetStateAction<number>>;
  fetchCartNumber: () => Promise<void>;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [numItemsInCart, setNumItemsInCart] = useState<number>(0);

  const fetchCartNumber = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        "/api/products?type=getNumberOfCartItems"
      );
      if (data.numItemsInCart) {
        setNumItemsInCart(data.numItemsInCart);
      }

      console.log(data);
    } catch (error: any) {
      console.log(error);
      setNumItemsInCart(0);
    }
  };

  useEffect(() => {
    fetchCartNumber();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numItemsInCart,
        setNumItemsInCart,
        fetchCartNumber: fetchCartNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
