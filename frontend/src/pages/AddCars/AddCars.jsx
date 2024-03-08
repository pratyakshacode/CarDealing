import React, { useState } from "react";
import "./AddCars.css";

const AddCars = () => {
  const [carDetails, setCarDetails] = useState({
    name: "",
    type: "",
    model: "",
    car_info: "",
  });

  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/cars", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carDetails),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  const onChange = (e) => {
    setCarDetails({ ...carDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 id="add-car-header">Add New Car</h1>
      <div id="add-car-container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="add-car-input">
              <label htmlFor="name">Car Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="add-car-input">
              <label htmlFor="type">Car Type</label>
              <input
                type="text"
                id="type"
                name="type"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="add-car-input">
              <label htmlFor="model">Car Modal</label>
              <input
                type="text"
                id="model"
                name="model"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div id="added-info">
              <span>{message}</span>
            </div>

            <button type="submit">Add Car</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCars;
