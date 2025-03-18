import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      for (const item of cart) {
        const orderData = {
          product_id: item.id,
          quantity: item.quantity,
        };
        await axios.post("http://localhost:5000/api/orders", orderData);
      }

      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      toast.error("Failed to place order!");
      console.error("Error placing order:", error);
    }
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{getTotalPrice()}</h3>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
