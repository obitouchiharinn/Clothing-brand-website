import React, { createContext, useState, useContext } from "react";

// Context
const CheckoutContext = createContext();

// Custom hook to use the checkout context
export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutCount, setCheckoutCount] = useState(0);

  const addToCheckout = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setCheckoutCount((prevCount) => prevCount + 1);
  };

  return (
    <CheckoutContext.Provider value={{ cartItems, checkoutCount, addToCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
