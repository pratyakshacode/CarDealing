import React, { useEffect, useState } from "react";
import "./CarDetails.css";
import { useParams } from "react-router-dom";
const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const id = params.id;
  const [show, setShow] = useState(false);
  const car_info = carDetails.car_info;

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCarDetails(data);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const response = await fetch("/api/deal", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car_id: id,
        dealer_id: car_info.dealership_id,
      }),
    });

    const data = await response.json();
    alert(data.message);
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  return (
    <div id="car-details-container">
      <div id="car-picture">
        <img src="/car.png" alt="" />
      </div>

      {show && (
        <div id="buy-now-container">
          <button id="buy-container-close" onClick={() => setShow(!show)}>
            X
          </button>
          <h1>Do You Really Wants To Buy This Car ? </h1>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      )}
      <div className="car-details" id="car-description-container">
        <h1>{carDetails.name}</h1>
        <h2>{carDetails.model}</h2>

        <div className="car-details-card">
          <h3>Car Type</h3>
          <span id="car-type-span">{carDetails.type}</span>
          <h3>Dealer</h3>

          <div id="dealer_info">
            <div className="dealer_info-input">
              <label htmlFor="dealer-name">Dealer Name</label>
              <input
                type="text"
                value={car_info ? car_info.dealership_name : ""}
                id="dealer-name"
                disabled
              />
            </div>
            <div className="dealer_info-input">
              <label htmlFor="dealer-email">Dealer Email</label>
              <input
                type="text"
                value={car_info ? car_info.dealership_email : ""}
                id="dealer-email"
                disabled
              />
            </div>
            <div className="dealer_info-input">
              <label htmlFor="dealer-location">Dealer Location</label>
              <input
                type="text"
                value={car_info ? car_info.dealership_location : ""}
                id="dealer-location"
                disabled
              />
            </div>
          </div>
          <button onClick={() => setShow(!show)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
