import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import logo from "../assets/logo.png";          // ensure this asset exists
import profileImg from "../assets/profile.jpg";  // imported image for profile
import jobImg from "../assets/job.jpg";          // imported image for jobs
import applicationImg from "../assets/Application.jpg";  // imported image for applications

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleProfileManagementClick = () => {
    navigate("/student-profile");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="head">
          <img src={logo} alt="Logo" className="logo" />
          <span>Student Career Hub</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="welcome">
        <h1 style={{ paddingTop: "50px" }}>Welcome to your Student Dashboard</h1>
        <p>
          "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
        </p>
      </div>
      <div className="card-container">
        <div className="card">
          <img src={profileImg} alt="Profile" />
          <div className="container">
            <h4><b>Profile</b></h4>
            <p>Update your details</p>
            <p>Manage Preferences</p>
            <button onClick={handleProfileManagementClick}>Go to profile</button>
          </div>
        </div>
        <div className="card">
          <img src={jobImg} alt="Jobs" />
          <div className="container">
            <h4><b>Jobs</b></h4>
            <p>Explore new roles</p>
            <p>Filter by skills</p>
            <button>Find jobs</button>
          </div>
        </div>
        <div className="card">
          <img src={applicationImg} alt="Applications" />
          <div className="container">
            <h4><b>Applications</b></h4>
            <p>Track your progress</p>
            <p>View submitted forms</p>
            <button>View Applications</button>
          </div>
        </div>
      </div>
      <footer>
        &copy; 2025 Student Career Hub | All Rights Reserved
      </footer>
    </div>
  );
}