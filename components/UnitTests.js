import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders BookingForm component', () => {
  render(<BookingForm />);
  const nameInput = screen.getByLabelText(/Name/i);
  expect(nameInput).toBeInTheDocument();
});

test('shows validation errors when form is incomplete', () => {
  render(<BookingForm />);
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/Name is required/i);
  expect(errorMessage).toBeInTheDocument();
});
