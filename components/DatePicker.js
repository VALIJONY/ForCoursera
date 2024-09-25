import React from "react";

function DatePicker({ id, name, value, onChange }) {
  return (
    <input
      type="date"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default DatePicker;
