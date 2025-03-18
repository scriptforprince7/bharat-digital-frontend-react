import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "../Cart.css"; // Make sure to create this CSS file
import DarkModeToggle from "../components/DarkModeToggle";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart!");
  };

  const handlePlaceOrder = async () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    const confirmOrder = await Swal.fire({
      title: "Confirm Order",
      text: `Are you sure you want to place this order for ₹${totalPrice}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, place order!",
      cancelButtonText: "Cancel",
    });
  
    if (confirmOrder.isConfirmed) {
      const { value: email } = await Swal.fire({
        title: "Enter your email",
        input: "email",
        inputPlaceholder: "Enter your email to receive the order bill",
        showCancelButton: true,
        confirmButtonText: "Submit",
      });
  
      if (email) {
        try {
          const orderData = {
            products: cart.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
            })),
            email,
          };
  
          await axios.post("http://localhost:5000/api/orders", orderData);
  
          toast.success("Order placed successfully!");
          localStorage.removeItem("cart");
          setCart([]);
        } catch (error) {
          toast.error("Failed to place order!");
          console.error("Error placing order:", error);
        }
      } else {
        Swal.fire("Email is required!", "", "error");
      }
    }
  };
  

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      {/* Back icon added */}
      <div className="back-btn" onClick={() => navigate(-1)}>
  ⬅️
</div>


      <h1>Your Cart</h1>
      <DarkModeToggle /> {/* Add Dark Mode Toggle here */}
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Product Name</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Amount (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(index)}
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="total-price">Total: ₹{getTotalPrice().toFixed(2)}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
