// src/__tests__/OrderConfirmationModal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderConfirmationModal from '../components/OrderConfirmationModal';

test('renders OrderConfirmationModal with correct content', () => {
  const mockOnClose = jest.fn();

  render(<OrderConfirmationModal onClose={mockOnClose} />);

  // Check if the modal heading is rendered
  expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument();

  // Check if the close button is rendered
  const closeButton = screen.getByText('Close');
  expect(closeButton).toBeInTheDocument();
  
  // Simulate clicking the close button
  fireEvent.click(closeButton);

  // Check if the onClose callback was called
  expect(mockOnClose).toHaveBeenCalled();
});
