import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import { useState } from "react";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import AddCars from "./pages/AddCars/AddCars";
import Deals from "./pages/Deals/Deals";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/cars/addCar" element={<AddCars />} />
          <Route path="/cars/mycars" element={<Cars />} />
          <Route path="/mydeals" element={<Deals />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
