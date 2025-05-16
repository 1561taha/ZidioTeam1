import React from "react";
<<<<<<< HEAD
import "./RecruiterDashboard.css";
import companyLogo from "../assets/company.png"; // replace with your company logo asset

export default function RecruiterDashboard() {
  // Dummy data
=======
import { useNavigate } from "react-router-dom";
import "./RecruiterDashboard.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";

export default function RecruiterDashboard() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/recruiter-profile");
  };

  const handleViewProfile = () => {
    navigate("/view-profile");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

>>>>>>> main
  const stats = [
    { label: "Total Applications", value: 45 },
    { label: "Shortlisted", value: 18 },
    { label: "Interviews", value: 12 },
    { label: "Hired", value: 8 },
  ];
<<<<<<< HEAD
=======

>>>>>>> main
  const jobs = [
    {
      title: "Senior Software Engineer",
      location: "Remote",
      type: "Full-time",
      applicants: 28,
<<<<<<< HEAD
      id: 1,
=======
>>>>>>> main
    },
    {
      title: "Product Designer",
      location: "San Francisco",
      type: "Full-time",
      applicants: 15,
<<<<<<< HEAD
      id: 2,
=======
    },
  ];

  const recentApplications = [
    {
      name: "Sarah Johnson",
      position: "Senior Software Engineer Position",
      date: "May 12, 2025",
      img: profileImg,
    },
    {
      name: "Michael Chen",
      position: "Product Designer Position",
      date: "May 11, 2025",
      img: profileImg,
>>>>>>> main
    },
  ];

  return (
<<<<<<< HEAD
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
=======
    <div className="recruiter-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand">CareerConnect</span>
        </div>
        <nav className="dashboard-nav">
          <a href="#">Dashboard</a>
          <a href="#">Job Listings</a>
          <a href="#">Internships</a>
          <a href="#">Hackathon</a>
          <a href="#">Courses</a>
          <a href="#">Applications</a>
          <a href="#">Company Profile</a>
        </nav>
        <div className="header-right">
          <img src={profileImg} alt="Profile" className="profile-icon" />
          <span className="company-name">TechCorp Inc.</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className="dashboard-content">
        <aside className="company-sidebar">
          <h2>TechCorp Inc.</h2>
          <div className="company-type">Technology Company</div>
          <div className="profile-action-btns">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Edit Company Profile
            </button>
            <button className="view-profile-btn" onClick={handleViewProfile}>
              View Profile
            </button>
          </div>
          <div className="company-details">
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
          <div className="quick-actions">
            <div className="quick-actions-title">Quick Actions</div>
            <button className="quick-action-btn">+ Post New Job</button>
            <button className="quick-action-btn">+ Post New Internship</button>
            <button className="quick-action-btn">+ Post New Hackathon</button>
            <button className="quick-action-btn">+ Post New Courses</button>
>>>>>>> main
            <button className="quick-action-btn secondary">
              <span role="img" aria-label="export">📄</span> Export Reports
            </button>
          </div>
        </aside>
<<<<<<< HEAD

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
=======
        <main className="company-main">
          <section className="application-stats">
            <h3>Application Statistics</h3>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
>>>>>>> main
                </div>
              ))}
            </div>
          </section>
<<<<<<< HEAD

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
=======
          <section className="active-jobs">
            <div className="active-jobs-header">
              <h3>Active Job Listings</h3>
              <a href="#" className="view-all-link">View All</a>
            </div>
            {jobs.map((job, idx) => (
              <div className="job-card" key={idx}>
                <div className="job-title">{job.title}</div>
                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>• {job.type}</span>
                  <span>• 👥 {job.applicants} applicants</span>
                </div>
                <div className="job-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="close-btn">Close</button>
                </div>
              </div>
            ))}
          </section>
          <section className="recent-applications">
            <div className="recent-applications-header">
              <h3>Recent Applications</h3>
              <a href="#" className="view-all-link">View All</a>
            </div>
            {recentApplications.map((app, idx) => (
              <div className="recent-app-card" key={idx}>
                <img src={app.img} alt={app.name} className="recent-app-img" />
                <div className="recent-app-info">
                  <div className="recent-app-name">{app.name}</div>
                  <div className="recent-app-position">{app.position}</div>
                  <div className="recent-app-date">Applied: {app.date}</div>
                </div>
                <div className="recent-app-actions">
                  <button className="shortlist-btn">Shortlist</button>
                  <button className="reject-btn">Reject</button>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
      <footer className="dashboard-footer">
        <div className="footer-container">
          <div className="footer-col">
            <div className="footer-title">CareerConnect</div>
            <div className="footer-desc">Connecting talent with opportunities</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">Quick Links</div>
            <div className="footer-link">About Us</div>
            <div className="footer-link">Contact</div>
            <div className="footer-link">Privacy Policy</div>
            <div className="footer-link">Terms of Service</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">For Students</div>
            <div className="footer-link">Browse Jobs</div>
            <div className="footer-link">Career Resources</div>
            <div className="footer-link">Resume Tips</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">For Employers</div>
            <div className="footer-link">Post a Job</div>
            <div className="footer-link">Browse Candidates</div>
            <div className="footer-link">Recruitment Solutions</div>
          </div>
        </div>
        <div className="footer-bottom-bar"></div>
      </footer>
>>>>>>> main
    </div>
  );
}