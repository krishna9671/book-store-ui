import React, { useState } from 'react';
import '../styles/BookPage.css';

const BookItem = ({ book, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    onAddToCart(book.id, quantity);
  };

  return (
    <div className="book-item">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price.toFixed(2)}</p>
      {/* <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
      /> */}
      <div className="quantity-control">
          <label htmlFor={`quantity-${book.id}`}>Quantity:</label>
          <input
            id={`quantity-${book.id}`}
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default BookItem;

