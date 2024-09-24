import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders booking form', () => {
  render(<BookingForm />);
  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();
});

test('submits form with validation errors', () => {
  render(<BookingForm />);
  const submitButton = screen.getByText(/book table/i);
  fireEvent.click(submitButton);
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
});
