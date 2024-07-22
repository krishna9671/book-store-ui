import React from 'react';
import '../styles/CartPage.css';

const OrderConfirmationModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Order Placed Successfully!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;