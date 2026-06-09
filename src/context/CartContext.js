import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // إضافة عنصر للسلة
  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook
export function useCart() {
  return useContext(CartContext);
}