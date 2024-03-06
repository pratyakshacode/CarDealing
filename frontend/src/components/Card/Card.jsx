import React from "react";
import "./Card.css";
const Card = ({ name, type, model, car_info }) => {
  return (
    <div>
      <div className="card">
        <img src="/car.jpg" alt="Car" />
        <div className="card-body">
          <h2>{name}</h2>
          <h4>{model}</h4>
          <p>{car_info}</p>
          <h4>{type}</h4>
            <button id="deal-car-button">Get Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
