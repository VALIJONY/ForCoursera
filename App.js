import React, { useState } from "react";
import BookingForm from "./components/BookingForm";
import './App.css';

function App() {
  const [availableTimes, setAvailableTimes] = useState(["18:00", "19:00", "20:00"]);
  
  const handleBooking = (formData) => {
    // This would typically be sent to the server
    console.log("Booking confirmed", formData);
  };

  return (
    <div className="App">
      <header>
        <h1>Book a Table at Little Lemon</h1>
      </header>
      <main>
        <BookingForm onBooking={handleBooking} availableTimes={availableTimes} />
      </main>
      <footer>
        <p>© 2024 Little Lemon Restaurant</p>
      </footer>
    </div>
  );
}

export default App;
