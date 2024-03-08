import { useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./Cars.css";

import React, { useEffect, useState } from "react";

const Cars = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCars();
  }, [location.pathname]);

  const fetchCars = async () => {
    try {
      const uri =
        location.pathname === "/cars" ? "/api/cars" : "/api/cars/mycars";
      const response = await fetch(uri, {
        credentials: "include",
      });
      const data = await response.json();

      if (data.message) {
        setCars([]);
        setMessage(data.message);
        return;
      }
      setCars(data);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!cars) return <h1>Loading...</h1>;

  return (
    <>
      <section id="cars">
        <div id="car-container">
          {message && <h1 style={{ color: "red" }}>{message}</h1>}
          {cars && cars.map((car) => <Card key={car._id} {...car} />)}
        </div>
      </section>
    </>
  );
};

export default Cars;
