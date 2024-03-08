import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
const Card = ({ car_id, name, type, model, car_info }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2>{name}</h2>
          <h4>{model}</h4>
          <h4>Dealer: </h4>
          <p>{car_info.dealership_email}</p>
          <h4>{type}</h4>
          <button
            id="deal-car-button"
            onClick={() => navigate(`/cars/${car_id}`)}
          >
            Get Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
