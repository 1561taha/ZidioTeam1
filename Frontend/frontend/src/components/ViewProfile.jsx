import React from "react";
import "./ViewProfile.css";
import profileImg from "../assets/profile.jpg"; // Use your actual profile image path

export default function ViewProfile() {
  // Example static data, replace with real data as needed
  const profile = {
    fullname: "Jamed Allan",
    title: "Recruitment Lead",
    companyName: "TechCorp Inc.",
    companyDescription: "Leading tech company specializing in innovative solutions.",
    website: "https://www.techcorp.com",
    contactNumber: "+1 234 567 8900",
    memberSince: "29 September 2019",
    username: "james",
  };

  return (
    <div className="view-profile-page">
      <div className="profile-sidebar">
        <div className="profile-card">
          <div className="profile-img-container">
            <img src={profileImg} alt="Profile" className="profile-img" />
            <button className="upload-btn" disabled>
              <span role="img" aria-label="upload">📷</span>
            </button>
          </div>
          <button className="upload-photo-btn" disabled>
            Upload New Photo
          </button>
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
          <button className="dashboard-tab-btn" disabled>
            Dashboard
          </button>
        </div>
        <div className="profile-view-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <div className="profile-value">{profile.fullname}</div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <div className="profile-value">{profile.title}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <div className="profile-value">{profile.companyName}</div>
            </div>
            <div className="form-group">
              <label>Website</label>
              <div className="profile-value">
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Company Description</label>
              <div className="profile-value">{profile.companyDescription}</div>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <div className="profile-value">{profile.contactNumber}</div>
            </div>
          </div>
          <div className="member-since-view">
            Member Since: <b>{profile.memberSince}</b>
          </div>
        </div>
      </div>
    </div>
  );
}