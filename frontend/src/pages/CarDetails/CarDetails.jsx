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
  const [email, setEmail] = useState("");
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

  useEffect(() => {
    fetchCarDetails();
  }, []);
  return (
    <div id="car-details-container">
      <div className="car-picture">
        <img src="/car.png" alt="" />
      </div>

      {show && (
        <div id="buy-now-container">
          <form onSubmit={() => console.log("hello")}>
            <input type="text" placeholder="Enter your name" />
            <input type="text" placeholder="Enter your email" />
            <input type="text" placeholder="Enter your phone number" />
            <button
              onClick={() => {
                setShow(!show);
                alert("Thank you for buying the car");
              }}
            >
              Buy Now
            </button>
          </form>
        </div>
      )}
      <div className="car-details" id="car-description-container">
        <h1>{carDetails.name}</h1>
        <h2>{carDetails.model}</h2>

        <div className="car-details-card">
          <h1 style={{ fontSize: "2.2rem" }}>Description of Car</h1>

          <span>{carDetails.type}</span>
          <h3>Dealer</h3>
          <p>{}</p>
          <button onClick={() => setShow(!show)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
