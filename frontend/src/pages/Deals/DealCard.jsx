import React, { useEffect, useState } from "react";
import "./DealCard.css";
import { jwtDecode } from "jwt-decode";

const DealCard = ({ deal_info, deal_id, status }) => {
  const [dealStatus, setDealStatus] = useState(status);
  const role = jwtDecode(localStorage.getItem("token")).role;
  const approveDeal = async () => {
    try {
      await fetch(`/api/deal/${deal_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setDealStatus("approved");
    } catch (error) {
      console.log("error in approving the deal", error);
    }
  };
  return (
    <>
      <div className="deal-card">
        <div className="deal-info">
          <h3>Car Information</h3>
          <div className="deal_car_info">
            <h3>{deal_info.car_name}</h3>
            <p>{deal_info.car_type}</p>
            <p>{deal_info.car_model}</p>
          </div>

          <h3>User Information</h3>
          <div className="deal_user_info">
            <h3>{deal_info.user_email}</h3>
            <p>{deal_info.user_location}</p>
          </div>

          <div className="deal_approve">
            <button
              id="deal_approve_button"
              className={dealStatus}
              onClick={approveDeal}
              disabled={role === "user"}
            >
              {dealStatus === "pending" ? "Pending" : "Approved"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCard;
