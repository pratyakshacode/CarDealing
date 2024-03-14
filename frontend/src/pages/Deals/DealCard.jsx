import React, { useEffect, useState } from "react";
import "./DealCard.css";
import { jwtDecode } from "jwt-decode";

const DealCard = ({ deal_info, deal_id, status }) => {
  const [dealStatus, setDealStatus] = useState(status);
  const role = jwtDecode(localStorage.getItem("token")).role;

  console.log("dealStatus", dealStatus, status, deal_info, deal_id, role);
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

  const cancelDeal = async () => {
    try {
      const response = await fetch(`/api/deal/${deal_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert(data.message);
      setDealStatus("cancelled");
    } catch (error) {}
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
            {dealStatus !== "cancelled" && (
              <button
                id="deal_approve_button"
                className={dealStatus}
                onClick={approveDeal}
                disabled={
                  role === "user" ||
                  dealStatus === "approved" ||
                  dealStatus === "cancelled"
                }
              >
                {dealStatus === "pending"
                  ? "Pending"
                  : dealStatus === "cancelled"
                  ? "Cancelled"
                  : dealStatus === "approved"
                  ? "Approved"
                  : "Approve"}
              </button>
            )}

            {dealStatus !== "approved" && role === "dealer" && (
              <button
                id="deal_cancel_button"
                onClick={cancelDeal}
                disabled={
                  role === "user" ||
                  dealStatus === "cancelled" ||
                  dealStatus === "approved"
                }
              >
                {dealStatus === "cancelled" ? "Cancelled" : "Cancel"}
              </button>
            )}

            {role === "user" && dealStatus === "cancelled" && (
              <span id="cancelled_deal_span">Cancelled By Dealer</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCard;
