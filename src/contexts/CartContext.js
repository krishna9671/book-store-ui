import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/apiConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const userId = localStorage.getItem('userId');
    console.log("11",userId);
    if (userId) {
      try {
        const response = await fetch(`${API_BASE_URL}/cart?username=${userId}`);
        const data = await response.json();
        setCart(data?.cartItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addCart = async (bookId, quantity) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`${API_BASE_URL}/cart/add?username=${userId}&bookId=${bookId}&quantity=${quantity}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          fetchCart();
        }
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  const removeItem = async (bookId) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`${API_BASE_URL}/cart/remove?username=${userId}&bookId=${bookId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchCart();
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart,setCart,addCart,removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
