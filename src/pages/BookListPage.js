import React from 'react';
import BookList from '../components/BookList';
import '../styles/BookPage.css';
const BookListPage = () => {
  return (
    <div className="book-list-page">
      <BookList />
    </div>
  );
};

export default BookListPage;