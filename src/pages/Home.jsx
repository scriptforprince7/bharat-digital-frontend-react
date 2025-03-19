import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import DarkModeToggle from "../components/DarkModeToggle";
import "../Home.css";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setUserEmail(decoded.email); // Extract email from payload
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Bharat Enterprise</h1>
      <DarkModeToggle />

      {/* Avatar icon */}
      <Link to="/login" className="avatar-icon">
        👤
      </Link>

      {/* Display user email if logged in */}
      {userEmail ? <h3>Hey, {userEmail}!</h3> : <h2>Welcome, Guest!</h2>}

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
