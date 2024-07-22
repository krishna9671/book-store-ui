
import React, { useContext, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import OrderConfirmationModal from '../components/OrderConfirmationModal';
import { useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';
import { API_BASE_URL } from '../config/apiConfig';

const Cart = () => {
    const { cart, setCart, addCart, removeItem } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleRemove = (bookId) => {
        removeItem(bookId);
    };

    const handleQuantityChange = (bookId, quantity) => {
        addCart(bookId, quantity);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const removeCart = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
          try {
            const response = await fetch(`${API_BASE_URL}/cart/removecart?username=${userId}`, {
                method:'DELETE',
            });
            const data = await response.json();
            
          } catch (error) {
            console.error('Error fetching cart:', error);
          }
        }
      };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCart([]);
       removeCart();
        navigate('/home')
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart?.length === 0 ? (<div>
                Cart is Empty. Please Add Products
            </div>) : (
                <>
                    {cart?.map(item => (
                        <div key={item.book.id} className="cart-item">
                            <div className="cart-item-details">
                                <h3>{item.book.title}</h3>
                                <p>Price: ${item.book.price}</p>
                                <div className="quantity-control">
                                    <label htmlFor={`quantity-${item.book.id}`}>Quantity:</label>
                                    <input
                                        id={`quantity-${item.book.id}`}
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.book.id, parseInt(e.target.value))}
                                    />
                                </div>
                                <button className="remove-button" onClick={() => handleRemove(item.book.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Total: ${totalAmount.toFixed(2)}</h3>
                        <button className="place-order-button" onClick={handleOpenModal}>Place Order</button>
                    </div>
                </>
            )}
            {isModalOpen && <OrderConfirmationModal onClose={handleCloseModal} />}
        </div>
    )
};

export default Cart;
