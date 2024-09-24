import React from 'react';
import BookingForm from './components/BookingForm';
import AccessibilityTags from './components/AccessibilityTags';
import './App.css';

function App() {
  return (
    <div className="App">
      <AccessibilityTags />
      <header className="App-header">
        <h1>Little Lemon Restaurant Booking</h1>
      </header>
      <main>
        <section id="booking" aria-label="Table Booking Section">
          <h2>Book a Table</h2>
          <BookingForm />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Little Lemon Restaurant</p>
      </footer>
    </div>
  );
}

export default App;
