import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bharat-digital-node-server.onrender.com/api/signup", {
        username,
        email,
        password,
      });
  
      if (response.status === 200) {
        alert("OTP sent to your email. Please verify!");
        navigate("/otp-verification", { state: { email } });
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data?.message || err.message);
      alert(`Signup failed: ${err.response?.data?.message || "Unknown error"}`);
    }
  };
  
  

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
