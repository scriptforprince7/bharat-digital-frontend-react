import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Bharat Enterprise</h1>
      <DarkModeToggle /> {/* Add Dark Mode Toggle here */}
      <div className="home-buttons">
        <Link to="/all-products">
          <button>All Products</button>
        </Link>
        <Link to="/cart">
          <button>Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
