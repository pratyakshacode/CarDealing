import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import DealCard from "./DealCard";
import "./Deals.css";

const Deals = () => {
  const id = jwtDecode(localStorage.getItem("token")).id;
  const [deals, setDeals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const findDeals = async () => {
      const response = await fetch(`/api/deal/${id}`, { signal });
      const data = await response.json();

      if (data.message) {
        setMessage(data.message);
        return;
      }

      setDeals(data);
      setMessage("");
    };
    findDeals();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div id="deals-container">
        <h1 id="deals-message">{message}</h1>
        {deals &&
          deals.map((deal, index) => {
            return <DealCard key={index} {...deal} />;
          })}
      </div>
    </>
  );
};

export default Deals;
