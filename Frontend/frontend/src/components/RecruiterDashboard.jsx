import React from "react";
import "./RecruiterDashboard.css";
import companyLogo from "../assets/company.png"; // replace with your company logo asset

export default function RecruiterDashboard() {
  // Dummy data
  const stats = [
    { label: "Total Applications", value: 45 },
    { label: "Shortlisted", value: 18 },
    { label: "Interviews", value: 12 },
    { label: "Hired", value: 8 },
  ];
  const jobs = [
    {
      title: "Senior Software Engineer",
      location: "Remote",
      type: "Full-time",
      applicants: 28,
      id: 1,
    },
    {
      title: "Product Designer",
      location: "San Francisco",
      type: "Full-time",
      applicants: 15,
      id: 2,
    },
  ];

  return (
    <div className="recruiter-root">
      {/* Top Navigation */}
      <nav className="recruiter-nav">
        <div className="nav-left">
          <span className="nav-logo" role="img" aria-label="logo">💼</span>
          <span className="nav-title">CareerConnect</span>
        </div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Job Listings</a>
          <a href="#">Applications</a>
          <a href="#">Company Profile</a>
        </div>
        <div className="nav-profile">
          <img src={companyLogo} alt="Company" className="nav-profile-img" />
          <span className="nav-profile-name">TechCorp Inc.</span>
          <span className="nav-bell" role="img" aria-label="notifications">🔔</span>
        </div>
      </nav>

      <div className="recruiter-content">
        {/* Sidebar */}
        <aside className="recruiter-sidebar">
          <div className="company-card">
            <img src={companyLogo} alt="Company" className="company-img" />
            <div className="company-info">
              <div className="company-name">TechCorp Inc.</div>
              <div className="company-type">Technology Company</div>
            </div>
            <button className="company-edit-btn">Edit Company Profile</button>
            <div className="company-meta">
              <div>
                <span role="img" aria-label="location">📍</span> San Francisco, CA
              </div>
              <div>
                <span role="img" aria-label="website">🌐</span> www.techcorp.com
              </div>
              <div>
                <span role="img" aria-label="employees">👥</span> 1000+ employees
              </div>
            </div>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn">+ Post New Job</button>
            <button className="quick-action-btn secondary">
              <span role="img" aria-label="export">📄</span> Export Reports
            </button>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="recruiter-main">
          {/* Application Stats */}
          <section className="recruiter-stats">
            <h2>Application Statistics</h2>
            <div className="stats-cards">
              {stats.map((s) => (
                <div className="stats-card" key={s.label}>
                  <div className="stats-value">{s.value}</div>
                  <div className="stats-label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Job Listings */}
          <section className="recruiter-jobs">
            <div className="jobs-header">
              <h2>Active Job Listings</h2>
              <a href="#" className="jobs-viewall">View All</a>
            </div>
            <div className="jobs-list">
              {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <div className="job-info">
                    <div className="job-title">{job.title}</div>
                    <div className="job-meta">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
                      <span>👥 {job.applicants} applicants</span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button className="job-edit-btn">Edit</button>
                    <button className="job-close-btn">Close</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}