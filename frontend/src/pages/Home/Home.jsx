import React from "react";

import "./Home.css";
const Home = () => {
  return (
    <>
      <section id="home-container">
        <div id="home-intro-container" className="home-content">
          <h1>Car Dealership</h1>
          <p>
            Welcome to our car dealership. We have the best cars in town. Check
            out our inventory and find the car of your dreams.
          </p>

          <div id="home-dealnow">
            <input type="text" placeholder="Enter Your Email" />
            <button>Deal Now</button>
          </div>
        </div>
        <div id="home-service-container" className="home-content">
          <img src="./car.png" alt="" />
        </div>
      </section>
    </>
  );
};

export default Home;
