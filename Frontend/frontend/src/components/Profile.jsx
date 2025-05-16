import React from "react";
import "./Profile.css"; // Import the CSS file
import defaultPic from "../assets/defaultpic.png"; // Import the default profile picture

export default function Profile() {
  return (
    <div className="profile-container">
      {/* <header className="profile-header">s
        <h1>My Profile</h1>
      </header> */}
      <main className="profile-main">
        <img src={defaultPic} alt="Default Profile" className="profile-pic" />
        <h2>John Doe</h2>
        <p>Email: johndoe@example.com</p>
        <p>Role: Student</p>
      </main>
    </div>
  );
}