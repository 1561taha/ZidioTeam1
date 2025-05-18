// src/components/LoginForm.jsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authservice";
import { AuthContext } from "../contexts/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [role, setRole] = useState("ROLE_Student");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // grab `login()` from context
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await loginService({ ...form, role });
      login({
        token: resp.token,
        userObj: {
          name: resp.username || form.username,
          role: resp.role,
        },
      });
      if (resp.role === "ROLE_Student") {
        navigate("/student-dashboard");
      } else if (resp.role === "ROLE_Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
        "Login failed. Please check your credentials and role."
      );
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2>Welcome to ZidioConnect</h2>
        <form onSubmit={handleSubmit}>
          <label>Login as</label>
          <div className="role-select">
            <label>
              <input
                type="radio"
                name="role"
                value="ROLE_Student"
                checked={role === "ROLE_Student"}
                onChange={handleRoleChange}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="ROLE_Recruiter"
                checked={role === "ROLE_Recruiter"}
                onChange={handleRoleChange}
              />
              Recruiter
            </label>
          </div>

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
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>

        {message && <div className="login-error">{message}</div>}

        <div className="login-links">
          <a href="#">Forgot Password?</a>
          <Link to="/register" className="register-link">
            Register
          </Link>
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
