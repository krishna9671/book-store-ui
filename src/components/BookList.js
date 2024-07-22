import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';
import '../styles/BookPage.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { addCart,cart } = useCart();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/books`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (bookId, quantity) => {
    const userId = localStorage.getItem('userId');
    
    addCart(bookId, quantity);

  }
  return (
    <div className="book-list">
        <div className="cart-icon">
        <Link to="/checkout">
          <span role="img" aria-label="cart">🛒</span>
          <span>{cart?.length}</span>
        </Link>
      </div>
      <h1>Available Books</h1>
      <div className="book-list-items">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
