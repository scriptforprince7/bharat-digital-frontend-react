import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DarkModeToggle from "../components/DarkModeToggle";
import "../Home.css";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Bharat Enterprise</h1>
      <DarkModeToggle />

      {/* Avatar icon */}
      {userEmail ? (
        <div className="avatar-icon" onClick={handleLogout}>
          🚪 Logout
        </div>
      ) : (
        <Link to="/login" className="avatar-icon">
          👤
        </Link>
      )}

      {/* Display user email if logged in */}
      {userEmail ? <h3>Hey, {userEmail}!</h3> : <h2>Welcome, Guest!</h2>}

      {/* Home buttons */}
      <div className="home-buttons">
        <Link to="/all-products">
          <button>All Products</button>
        </Link>
        <Link to="/cart">
          <button>Cart</button>
        </Link>
        {userEmail && (
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
