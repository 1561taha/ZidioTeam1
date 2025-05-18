import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const status = [
    { label: "Applied", value: 12 },
    { label: "In Review", value: 5 },
    { label: "Shortlisted", value: 3 },
    { label: "Rejected", value: 2 },
  ];

  const recentApplications = [
    {
      title: "Software Developer Intern",
      company: "TechCorp Inc.",
      date: "May 10, 2025",
      status: "In Review",
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions Ltd.",
      date: "May 8, 2025",
      status: "Shortlisted",
    },
  ];

  return (
    <div className="dashboard-root">
      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Sidebar/Profile */}
        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <img
              src={profileImg}
              alt="Profile"
              className="profile-img"
            />
            <div className="profile-info">
              <div className="profile-name">John Doe</div>
              <div className="profile-role">Computer Science Student</div>
              <div className="profile-university">
                University of Technology
              </div>
            </div>
            <button
              className="profile-edit-btn"
              onClick={() => navigate("/student-profile")}
            >
              Edit Profile
            </button>
          </div>

          <div className="resume-card">
            <div className="resume-title">Resume</div>
            <div className="resume-upload">
              <label
                htmlFor="resume-upload-input"
                className="resume-upload-box"
              >
                <span
                  role="img"
                  aria-label="upload"
                  className="resume-upload-icon"
                >
                  📤
                </span>
                <div>
                  Drop your resume here or{" "}
                  <span className="resume-browse">browse files</span>
                </div>
                <input
                  id="resume-upload-input"
                  type="file"
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <main className="dashboard-main">
          {/* Application Status */}
          <section className="dashboard-status">
            <h2>Application Status</h2>
            <div className="status-cards">
              {status.map((s) => (
                <div className="status-card" key={s.label}>
                  <div className="status-value">{s.value}</div>
                  <div className="status-label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Applications */}
          <section className="dashboard-recent">
            <div className="recent-header">
              <h2>Recent Applications</h2>
              <button
                className="recent-viewall-btn"
                onClick={() => navigate("/applications")}
              >
                View All
              </button>
            </div>

            <div className="recent-list">
              {recentApplications.map((app, idx) => (
                <div className="recent-card" key={idx}>
                  <div>
                    <div className="recent-title">{app.title}</div>
                    <div className="recent-company">{app.company}</div>
                    <div className="recent-date">
                      Applied on: {app.date}
                    </div>
                  </div>
                  <div
                    className={`recent-status recent-status-${app.status
                      .replace(/\s/g, "")
                      .toLowerCase()}`}
                  >
                    {app.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination (dummy) */}
            <div className="recent-pagination">
              <button disabled>{"<"}</button>
              <span>2 / 4</span>
              <button>{">"}</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
