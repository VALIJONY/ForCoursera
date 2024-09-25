import React, { useState } from "react";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

function BookingForm({ onBooking, availableTimes }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    occasion: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.date) formErrors.date = "Date is required";
    if (!formData.time) formErrors.time = "Time is required";
    if (!formData.guests || formData.guests <= 0) formErrors.guests = "Number of guests must be greater than 0";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onBooking(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="booking-form">
      <fieldset>
        <legend id="booking-form">Make a reservation</legend>

        {/* Date Field */}
        <label htmlFor="date">Choose a date</label>
        <DatePicker
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-required="true"
        />
        {errors.date && <span className="error">{errors.date}</span>}

        {/* Time Field */}
        <label htmlFor="time">Choose a time</label>
        <TimePicker
          id="time"
          name="time"
          availableTimes={availableTimes}
          value={formData.time}
          onChange={handleChange}
          aria-required="true"
        />
        {errors.time && <span className="error">{errors.time}</span>}

        {/* Guests Field */}
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          required
        />
        {errors.guests && <span className="error">{errors.guests}</span>}

        {/* Occasion Field */}
        <label htmlFor="occasion">Occasion</label>
        <input
          type="text"
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Book Now</button>
      </fieldset>
    </form>
  );
}

export default BookingForm;
