import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Card = ({ car_id, name, type, model, car_info, car_status }) => {
  const sold = car_status == "sold";
  const navigate = useNavigate();
  const role = jwtDecode(localStorage.getItem("token")).role;

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2>{name}</h2>
          <h4>{model}</h4>
          <h4>Dealer: </h4>
          <p>{car_info.dealership_email}</p>
          <h4>{type}</h4>
          {role === "user" && (
            <button
              id="deal-car-button"
              onClick={() => navigate(`/cars/${car_id}`)}
              disabled={sold}
              className={sold ? "car_soldout" : "car_available"}
            >
              {sold ? "Sold Out" : "Get Now"}
            </button>
          )}

          {role === "dealer" && (
            <span style={{ margin: "10px", color: "#e99", fontWeight: "bold" }}>
              {sold ? "Sold" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
