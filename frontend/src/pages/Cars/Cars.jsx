import Card from "../../components/Card/Card";
import "./Cars.css";

import React, { useEffect, useState } from "react";

const Cars = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchCars();
  }, []);
  const fetchCars = async () => {
    const response = await fetch("http://localhost:3000/api/cars");
    const data = await response.json();
    setCars(data);
    console.log(data);
  };
  return (
    <>
      <section id="cars">
        <div id="car-container">
          {cars && cars.map((car) => <Card key={car._id} {...car} />)}
        </div>
      </section>
    </>
  );
};

export default Cars;
