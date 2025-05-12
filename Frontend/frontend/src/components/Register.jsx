import React, { useState } from "react";
import { register } from "../services/authservice";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Form.css"; // Import the CSS file for styling

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "ROLE_Recruiter", // Default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await register(form);
      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (err) {
      const data = err.response?.data;
      setMessage(
        typeof data === "string" ? data : JSON.stringify(data)
      );
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Register</h2>
        {message && <p className="form-message">{message}</p>}
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
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
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_Student">Student</option>
            <option value="ROLE_Recruiter">Recruiter</option>
          </select>
          <div className="login-btn-wrapper">
            <button className="login-btn" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className="login-links">
          <Link to="/login">Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
}
