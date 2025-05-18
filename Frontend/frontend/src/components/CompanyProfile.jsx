import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./CompanyProfile.css";
import profileImg from "../assets/profile.jpg";

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/recruiter/profile")
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="centered-loading">Loading...</div>;
  if (!profile) return <div className="centered-loading">Profile not found.</div>;

  return (
    <div className="view-profile-page modern-view-profile-page">
      <aside className="profile-sidebar modern-profile-sidebar">
        <div className="profile-card modern-profile-card">
          <div className="profile-img-container modern-profile-img-container">
            <img
              src={profile.photoUrl || profileImg}
              alt="Company"
              className="profile-img modern-profile-img"
            />
          </div>
          <div className="profile-name modern-profile-name">{profile.fullName || "Company Name"}</div>
          <div className="profile-username modern-profile-username">
            @{profile.title || "Your Title"}
          </div>
        </div>
      </aside>
      <main className="profile-main modern-profile-main">
        <div className="edit-profile-header modern-edit-profile-header">Company Profile</div>
        <div className="profile-view-form modern-profile-view-form">
          <div className="form-row modern-form-row">
            <div className="form-group modern-form-group">
              <label>Company Name</label>
              <div className="profile-value modern-profile-value">{profile.companyName}</div>
            </div>
            <div className="form-group modern-form-group">
              <label>Website</label>
              <div className="profile-value modern-profile-value">
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              </div>
            </div>
          </div>
          <div className="form-row modern-form-row">
            <div className="form-group modern-form-group">
              <label>Description</label>
              <div className="profile-value modern-profile-value">{profile.companyDescription}</div>
            </div>
            <div className="form-group modern-form-group">
              <label>Contact Number</label>
              <div className="profile-value modern-profile-value">{profile.contactNumber}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}