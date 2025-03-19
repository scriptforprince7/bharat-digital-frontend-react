import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Dashboard.css"; // For sidebar styling

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          {/* All Products tab - Active by default on /dashboard */}
          <li
            className={
              location.pathname === "/dashboard" || location.pathname.includes("all-products")
                ? "active"
                : ""
            }
          >
            <Link to="all-products">📦 All Products</Link> {/* Relative path */}
          </li>

          {/* Add Product tab */}
          <li className={location.pathname.includes("add-product") ? "active" : ""}>
            <Link to="add-product">➕ Add Product</Link> {/* Relative path */}
          </li>
        </ul>
      </div>

      {/* Content Outlet */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
