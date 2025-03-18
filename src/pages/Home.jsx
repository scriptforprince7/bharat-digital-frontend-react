import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import "../Home.css"; // Make sure styling looks good

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Bharat Enterprise</h1>
      <DarkModeToggle />

      {/* Avatar icon */}
      <Link to="/login" className="avatar-icon">
        👤
      </Link>

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
