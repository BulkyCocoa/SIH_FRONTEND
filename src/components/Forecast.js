import React, { useState } from "react";
import "./Forecast.css";

const Forecast = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Date selected: ${date}`);
    // Add logic here to handle the submitted date
  };

  return (
    <div className="forecast-container">
      <h1>Forecast Page</h1>
      <p>Please select a date to view the forecast:</p>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="date-input"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default Forecast;
