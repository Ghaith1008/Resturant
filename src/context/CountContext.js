import React, { createContext, useState } from "react";

export const CountContext = createContext();

export const CountProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  // إضافة منتج للسلة
  const addToCart = (product) => {

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  // إذا المنتج موجود
  if (existingItem) {

    const updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? {
            ...item,

            // زيادة حسب الكمية المختارة
            quantity:
              item.quantity + product.quantity,
          }
        : item
    );

    setCartItems(updatedCart);

  } else {

    // إذا منتج جديد
    setCartItems([
      ...cartItems,
      {
        ...product,

        // تخزين الكمية المختارة
        quantity: product.quantity,
      },
    ]);
  }
};

  // زيادة الكمية
  const incrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // إنقاص الكمية
  const decrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // حذف منتج
  const removeItem = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  // عدد العناصر
  const count = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // السعر الكلي
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CountContext.Provider
  value={{
    cartItems,
    setCartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    count,
    totalPrice,
  }}
>
      {children}
    </CountContext.Provider>
  );
};