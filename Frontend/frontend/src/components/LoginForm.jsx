import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authservice";
import "./LoginForm.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await login(form); // your login API call
      localStorage.setItem("token", resp.token); // save token
      navigate("/student-dashboard"); // redirect
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Welcome to ZidioConnect</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="login-btn-wrapper">
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>
        <div className="login-links">
          <a href="#">Forgot Password?</a>
          <Link to="/register" className="register-link">Register</Link>
        </div>
        <div className="login-or">Or login with</div>
        <div className="login-socials">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-google"></i>
        </div>
      </div>
    </div>
  );
}
