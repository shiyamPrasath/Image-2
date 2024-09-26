import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const CartContext = createContext();

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [pickupAddress, setPickupAddress] = useState(null); // Add pickup address state
  const [cartQuantity, setCartQuantity] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart).reduce((total, item) => total + item.quantity, 0) : 0;
  });

  useEffect(() => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // New method to update pickup address
  const updatePickupAddress = (address) => {
    setPickupAddress(address);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartQuantity, addToCart, removeFromCart, updateCartQuantity, pickupAddress, updatePickupAddress }}>
      {children}
    </CartContext.Provider>
  );
};
