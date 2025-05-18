import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navRef = useRef();

  // Close nav on outside click (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close nav on route change
  useEffect(() => {
    setOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        {/* Logo */}
        <Link to={user ? "/student-dashboard" : "/"} className="logo" tabIndex={0}>
          <img src={logo} alt="CareerConnect" />
          <span className="logo-text">CareerConnect</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className={`nav-toggle${open ? " open" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav links */}
        <nav
          className={`main-nav${open ? " open" : ""}`}
          ref={navRef}
          aria-label="Main navigation"
        >
          {user ? (
            <>
              <NavLink to="/student-dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/jobs" onClick={() => setOpen(false)}>
                Jobs
              </NavLink>
              <NavLink to="/applications" onClick={() => setOpen(false)}>
                Applications
              </NavLink>
              <NavLink to="/student-profile" onClick={() => setOpen(false)}>
                Profile
              </NavLink>
              {/* Add recruiter dashboard/profile links if needed */}
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </nav>

        {/* User / Logout */}
        {user && (
          <div className="user-actions">
            <span className="username" title={user.name || user.username}>
              {user.name || user.username}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
