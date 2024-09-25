import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';

test('renders form correctly', () => {
  render(<BookingForm availableTimes={["18:00", "19:00"]} />);
  expect(screen.getByText(/choose a date/i)).toBeInTheDocument();
  expect(screen.getByText(/choose a time/i)).toBeInTheDocument();
});

test('displays validation errors when form is incomplete', () => {
  render(<BookingForm availableTimes={["18:00", "19:00"]} />);
  fireEvent.click(screen.getByText(/book now/i));
  
  expect(screen.getByText(/date is required/i)).toBeInTheDocument();
  expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  expect(screen.getByText(/number of guests must be greater than 0/i)).toBeInTheDocument();
});

test('submits form successfully when all fields are valid', () => {
  const mockBooking = jest.fn();
  render(<BookingForm availableTimes={["18:00", "19:00"]} onBooking={mockBooking} />);
  
  // Fill out the form
  fireEvent.change(screen.getByLabelText(/choose a date/i), { target: { value: '2024-10-10' } });
  fireEvent.change(screen.getByLabelText(/choose a time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '2' } });
  
  // Submit form
  fireEvent.click(screen.getByText(/book now/i));
  
  // Check if the form data has been submitted correctly
  expect(mockBooking).toHaveBeenCalledWith({
    date: '2024-10-10',
    time: '18:00',
    guests: '2',
    occasion: '',
  });
});

test('displays error when number of guests is 0', () => {
  render(<BookingForm availableTimes={["18:00", "19:00"]} />);
  
  // Fill out the form but set guests to 0
  fireEvent.change(screen.getByLabelText(/choose a date/i), { target: { value: '2024-10-10' } });
  fireEvent.change(screen.getByLabelText(/choose a time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '0' } });
  
  // Submit form
  fireEvent.click(screen.getByText(/book now/i));
  
  // Check if the error for number of guests is displayed
  expect(screen.getByText(/number of guests must be greater than 0/i)).toBeInTheDocument();
});

test('displays correct available times in the dropdown', () => {
  render(<BookingForm availableTimes={["18:00", "19:00", "20:00"]} />);
  
  const timeDropdown = screen.getByLabelText(/choose a time/i);
  
  // Check if all available times are present in the dropdown
  fireEvent.change(timeDropdown, { target: { value: "19:00" } });
  expect(timeDropdown.value).toBe("19:00");
  
  expect(screen.getByText(/18:00/)).toBeInTheDocument();
  expect(screen.getByText(/19:00/)).toBeInTheDocument();
  expect(screen.getByText(/20:00/)).toBeInTheDocument();
});

test('shows an error when required fields are empty', () => {
  render(<BookingForm availableTimes={["18:00", "19:00"]} />);
  
  // Submit without filling in the form
  fireEvent.click(screen.getByText(/book now/i));
  
  // Check that errors are displayed for required fields
  expect(screen.getByText(/date is required/i)).toBeInTheDocument();
  expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  expect(screen.getByText(/number of guests must be greater than 0/i)).toBeInTheDocument();
});
