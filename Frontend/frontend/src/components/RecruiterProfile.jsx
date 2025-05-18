import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterProfile, updateRecruiterProfile } from "../services/recruiterProfileService";
import "./RecruiterProfile.css";
import profileImg from "../assets/profile.jpg";
import api from "../services/api";

export default function RecruiterProfile() {
  const [profile, setProfile] = useState({
    fullname: "",
    title: "",
    companyName: "",
    companyDescription: "",
    website: "",
    contactNumber: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    setLoading(true);
    getRecruiterProfile()
      .then(res => {
        setProfile({
          fullname: res.data.fullName || "",
          title: res.data.title || "",
          companyName: res.data.companyName || "",
          companyDescription: res.data.companyDescription || "",
          website: res.data.website || "",
          contactNumber: res.data.contactNumber || "",
          photoUrl: res.data.photoUrl || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setMessage("Could not load profile. Please try again.");
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await updateRecruiterProfile({
        fullName: profile.fullname,
        title: profile.title,
        companyName: profile.companyName,
        companyDescription: profile.companyDescription,
        website: profile.website,
        contactNumber: profile.contactNumber,
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setMessage("File is too large. Max size is 1MB.");
      return;
    }
    const formData = new FormData();
    formData.append("photo", file);
    setPhotoUploading(true);
    try {
      const res = await api.post("/recruiter/profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(prev => ({ ...prev, photoUrl: res.data.photoUrl }));
      setMessage("Photo uploaded successfully!");
    } catch (err) {
      setMessage("Failed to upload photo.");
    }
    setPhotoUploading(false);
  };

  const goToDashboard = () => {
    navigate("/recruiter-dashboard");
  };

  if (loading) return <div className="centered-loading">Loading...</div>;

  return (
    <div className="recruiter-profile-page modern-profile-page">
      <aside className="profile-sidebar modern-profile-sidebar">
        <div className="profile-card modern-profile-card">
          <div className="profile-img-container modern-profile-img-container">
            <img
              src={profile.photoUrl || profileImg}
              alt="Profile"
              className="profile-img modern-profile-img"
            />
            <label htmlFor="profile-photo-upload" className="modern-upload-btn" title="Upload new photo">
              <span role="img" aria-label="upload">📷</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="profile-photo-upload"
                onChange={handlePhotoChange}
                disabled={photoUploading}
              />
            </label>
            {photoUploading && <div className="photo-uploading-spinner"></div>}
          </div>
          <div className="profile-name modern-profile-name">{profile.fullname || "Your Name"}</div>
          <div className="profile-username modern-profile-username">
            @{profile.title || "Your Title"}
          </div>
        </div>
      </aside>
      <main className="profile-main modern-profile-main">
        <div className="edit-profile-header modern-edit-profile-header">Edit Profile</div>
        <div className="profile-tabs modern-profile-tabs">
          <div className="profile-tab active">User Info</div>
          {/* <button
            className="dashboard-tab-btn"
            type="button"
            onClick={goToDashboard}
          >
            Dashboard
          </button> */}
        </div>
        <form className="profile-form modern-profile-form" onSubmit={handleSubmit}>
          <div className="form-row modern-form-row">
            <div className="form-group modern-form-group">
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
            <div className="form-group modern-form-group">
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
          <div className="form-row modern-form-row">
            <div className="form-group modern-form-group">
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
            <div className="form-group modern-form-group">
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
          <div className="form-row modern-form-row">
            <div className="form-group modern-form-group">
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
            <div className="form-group modern-form-group">
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
          <button className="update-info-btn modern-update-info-btn" type="submit">
            Update Info
          </button>
          {message && <div className="profile-message modern-profile-message">{message}</div>}
        </form>
      </main>
    </div>
  );
}