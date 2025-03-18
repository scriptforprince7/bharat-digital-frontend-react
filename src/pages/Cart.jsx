import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handlePlaceOrder = async () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // First SweetAlert for order confirmation
    const confirmOrder = await Swal.fire({
      title: "Confirm Order",
      text: `Are you sure you want to place this order for ₹${totalPrice}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, place order!",
      cancelButtonText: "Cancel",
    });

    if (confirmOrder.isConfirmed) {
      // Second SweetAlert to get email
      const { value: email } = await Swal.fire({
        title: "Enter your email",
        input: "email",
        inputPlaceholder: "Enter your email to receive the order bill",
        showCancelButton: true,
        confirmButtonText: "Submit",
      });

      if (email) {
        try {
          for (const item of cart) {
            const orderData = {
              product_id: item.id,
              quantity: item.quantity,
              email: email,
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
      } else {
        Swal.fire("Email is required!", "", "error");
      }
    }
  };

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
          <h3>Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
