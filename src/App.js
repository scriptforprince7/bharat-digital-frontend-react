import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
