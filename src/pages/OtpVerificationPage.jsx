import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../Auth.css";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Get email from state

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bharat-digital-node-server.onrender.com/api/verify-otp", {
        email,
        otp,
      });
      

      if (response.data.success) {
        toast.success("OTP Verified Successfully!");
        navigate("/login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <p>Enter the OTP sent to your email: {email}</p>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;
