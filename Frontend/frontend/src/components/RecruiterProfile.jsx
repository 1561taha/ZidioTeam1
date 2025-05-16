import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecruiterProfile.css";
import profileImg from "../assets/profile.jpg";

export default function RecruiterProfile() {
  const [profile, setProfile] = useState({
    fullname: "",
    title: "",
    companyName: "",
    companyDescription: "",
    website: "",
    contactNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const goToDashboard = () => {
    navigate("/recruiter-dashboard");
  };

  return (
    <div className="recruiter-profile-page">
      <div className="profile-sidebar">
        <div className="profile-card">
          <div className="profile-name">{profile.fullname || "Your Name"}</div>
          <div className="profile-username">
            @{profile.title || "Your Title"}
          </div>
          <div className="profile-img-container">
            <img src={profileImg} alt="Profile" className="profile-img" />
            <button className="upload-btn">
              <span role="img" aria-label="upload">📷</span>
            </button>
          </div>
          <button className="upload-photo-btn">Upload New Photo</button>
          <div className="upload-info">
            Upload a new avatar. Larger image will be resized automatically.<br />
            Maximum upload size is 1 MB.
          </div>
        </div>
      </div>
      <div className="profile-main">
        <div className="edit-profile-header">Edit Profile</div>
        <div className="profile-tabs">
          <div className="profile-tab active">User Info</div>
          <button
            className="dashboard-tab-btn"
            type="button"
            onClick={goToDashboard}
          >
            Dashboard
          </button>
        </div>
        <form className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                placeholder="Enter your title"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                placeholder="Enter your company name"
                required
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={profile.website}
                onChange={handleChange}
                placeholder="Enter your company website"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Description</label>
              <textarea
                name="companyDescription"
                value={profile.companyDescription}
                onChange={handleChange}
                rows={3}
                placeholder="Enter a brief company description"
                required
                style={{ minHeight: "48px", height: "48px", maxHeight: "120px" }}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                placeholder="Enter your contact number"
                required
                style={{ height: "48px" }}
              />
            </div>
          </div>
          <button className="update-info-btn" type="submit">
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
}