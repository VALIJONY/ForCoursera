import React from "react";

function TimePicker({ id, name, availableTimes, value, onChange }) {
  return (
    <select id={id} name={name} value={value} onChange={onChange} required>
      <option value="">Select time</option>
      {availableTimes.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}

export default TimePicker;
