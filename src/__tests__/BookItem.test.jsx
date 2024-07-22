// src/__tests__/BookItem.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookItem from '../components/BookItem'; // Adjust the import path if needed

// Mock book data
const book = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  price: 19.99,
};

// Mock function for onAddToCart
const mockOnAddToCart = jest.fn();

test('renders BookItem with book details', () => {
  const { getByText, getByLabelText } = render(
    <BookItem book={book} onAddToCart={mockOnAddToCart} />
  );

  // Check if book details are rendered
  expect(getByText('Test Book')).toBeInTheDocument();
  expect(getByText('Author: Test Author')).toBeInTheDocument();
  expect(getByText('Price: $19.99')).toBeInTheDocument();

  // Quantity input is rendered and has initial value
  const quantityInput = getByLabelText('Quantity:');
  expect(quantityInput).toBeInTheDocument();
  expect(quantityInput.value).toBe('1');
});

test('updates quantity input value', () => {
  const { getByLabelText } = render(
    <BookItem book={book} onAddToCart={mockOnAddToCart} />
  );

  const quantityInput = getByLabelText('Quantity:');
  
  // Modify quantity
  fireEvent.change(quantityInput, { target: { value: '3' } });
  
  // Check if quantity input value is updated
  expect(quantityInput.value).toBe('3');
});

test('calls onAddToCart with correct arguments on button click', () => {
  const { getByText } = render(
    <BookItem book={book} onAddToCart={mockOnAddToCart} />
  );

  const addToCartButton = getByText('Add to Cart');
  
//Add Cart Button Event
  fireEvent.click(addToCartButton);

  // onAddToCart arguments passed check
  expect(mockOnAddToCart).toHaveBeenCalledWith(book.id, 1);
});
