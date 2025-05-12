import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import styles for the header
import logo from "../assets/logo.png"; // Import the logo

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Zidio Connect" className="header-logo" />
      <div className="header-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}