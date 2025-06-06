import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterProfile } from "../services/recruiterProfileService";
import "./RecruiterDashboard.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import { AuthContext } from "../contexts/AuthContext";

export default function RecruiterDashboard({ jobs = [], internships = [], hackathons = [], courses = [] }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getRecruiterProfile()
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  const handleEditProfile = () => {
    navigate("/recruiter-profile");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  const stats = [
    { label: "Total Applications", value: 45 },
    { label: "Shortlisted", value: 18 },
    { label: "Interviews", value: 12 },
    { label: "Hired", value: 8 },
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
    },
  ];

  return (
    <div className="recruiter-dashboard">
      {/* Only one header, no upper header/profile */}
      <header className="dashboard-header modern-dashboard-header">
        <div className="dashboard-header-inner">
          <div className="header-left">
            <img src={logo} alt="Logo" className="logo" />
            <span className="brand">CareerConnect</span>
          </div>
          <nav className="modern-dashboard-nav" id="main-nav">
            <a href="#">Jobs</a>
            <a href="#">Internships</a>
            <a href="#">Hackathon</a>
            <a href="#">Courses</a>
            <a href="#">Applications</a>
          </nav>
          <div className="header-right">
            {/* Profile photo from backend */}
            <img
              src={profile?.photoUrl || profileImg}
              alt="Profile"
              className="profile-icon"
            />
            <span className="company-name">{profile?.companyName || "Company"}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <button className="mobile-nav-toggle" onClick={() => {
            document.getElementById('main-nav').classList.toggle('open');
          }}>
            <span>☰</span>
          </button>
        </div>
      </header>
      <div className="dashboard-content">
        <aside className="company-sidebar">
          {/* Profile photo in sidebar */}
          <div className="sidebar-profile-img-container">
            <img
              src={profile?.photoUrl || profileImg}
              alt="Profile"
              className="sidebar-profile-img"
            />
          </div>
          <h2>{profile?.companyName || "Company Name"}</h2>
          <div className="company-type">{profile?.title || "Technology Company"}</div>
          <div className="profile-action-btns">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Edit Company Profile
            </button>
            <button
              className="view-profile-btn"
              type="button"
              onClick={() => navigate("/company-profile")}
            >
              View Profile
            </button>
          </div>
          <div className="company-details">
            <div>
              <span role="img" aria-label="website">🌐</span> {profile?.website || "www.techcorp.com"}
            </div>
            <div>
              <span role="img" aria-label="employees">👥</span> 1000+ employees
            </div>
          </div>
          <div className="quick-actions">
            <div className="quick-actions-title">Quick Actions</div>
            <button
              className="quick-action-btn"
              onClick={() => navigate("/job-post")}
            >
              + Post New Job
            </button>
            <button
              className="quick-action-btn"
              onClick={() => navigate("/internship-post")}
            >
              + Post New Internship
            </button>
            <button
              className="quick-action-btn"
              onClick={() => navigate("/hackathon-post")}
            >
              + Post New Hackathon
            </button>
            <button
              className="quick-action-btn"
              onClick={() => navigate("/course-post")}
            >
              + Post New Courses
            </button>
            <button className="quick-action-btn secondary">
              <span role="img" aria-label="export">📄</span> Export Reports
            </button>
          </div>
        </aside>
        <main className="company-main">
          <section className="application-stats">
            <h3>Application Statistics</h3>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="active-jobs">
            <div className="active-jobs-header">
              <h3>Active Job Listings</h3>
              <a
                href="#"
                className="view-all-link"
                onClick={e => {
                  e.preventDefault();
                  navigate("/manage-job");
                }}
              >
                View All
              </a>
            </div>
            {jobs.length === 0 ? (
              <div className="no-jobs-msg">No jobs posted yet.</div>
            ) : (
              jobs.map((job, idx) => (
                <div className="job-card" key={job.id || idx}>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>• {job.type || job.jobType}</span>
                    <span>• 👥 {job.applicants || 0} applicants</span>
                  </div>
                  <div className="job-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/job-view/${job.id}`, { state: { job, readOnly: true } })}
                    >
                      View
                    </button>
                    <button
                      className="close-btn"
                      onClick={() => navigate(`/job-update/${job.id}`, { state: { job, isUpdate: true } })}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
          <section className="active-internships">
            <div className="active-jobs-header">
              <h3>Active Internship Listings</h3>
              <a
                href="#"
                className="view-all-link"
                onClick={e => {
                  e.preventDefault();
                  navigate("/manage-internship");
                }}
              >
                View All
              </a>
            </div>
            {internships.length === 0 ? (
              <div className="no-jobs-msg">No internships posted yet.</div>
            ) : (
              internships.slice(0, 2).map((internship, idx) => (
                <div className="job-card" key={internship.id || idx}>
                  <div className="job-title">{internship.title}</div>
                  <div className="job-meta">
                    <span>📍 {internship.location}</span>
                    <span>• {internship.internshipType}</span>
                    <span>• 👥 {internship.openings} openings</span>
                  </div>
                  <div className="job-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/internship-view/${internship.id}`, { state: { internship, readOnly: true } })}
                    >
                      View
                    </button>
                    <button
                      className="close-btn"
                      onClick={() => navigate(`/internship-update/${internship.id}`, { state: { internship, isUpdate: true } })}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
          {/* --- Add Active Hackathon Listings --- */}
          <section className="active-hackathons">
            <div className="active-jobs-header">
              <h3>Active Hackathon Listings</h3>
              <a
                href="#"
                className="view-all-link"
                onClick={e => {
                  e.preventDefault();
                  navigate("/manage-hackathon");
                }}
              >
                View All
              </a>
            </div>
            {hackathons.length === 0 ? (
              <div className="no-jobs-msg">No hackathons posted yet.</div>
            ) : (
              hackathons.map((hackathon, idx) => (
                <div className="job-card" key={hackathon.id || idx}>
                  <div className="job-title">{hackathon.title}</div>
                  <div className="job-meta">
                    <span>📍 {hackathon.location}</span>
                    <span>• {hackathon.mode}</span>
                    <span>• 🗓 {hackathon.startDate}</span>
                  </div>
                  <div className="job-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/hackathon-view/${hackathon.id}`, { state: { hackathon, readOnly: true } })}
                    >
                      View
                    </button>
                    <button
                      className="close-btn"
                      onClick={() => navigate(`/hackathon-update/${hackathon.id}`, { state: { hackathon, isUpdate: true } })}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
          {/* --- Add Active Courses Listings --- */}
          <section className="active-courses">
            <div className="active-jobs-header">
              <h3>Active Courses Listings</h3>
              <a
                href="#"
                className="view-all-link"
                onClick={e => {
                  e.preventDefault();
                  navigate("/manage-course");
                }}
              >
                View All
              </a>
            </div>
            {courses.length === 0 ? (
              <div className="no-jobs-msg">No courses posted yet.</div>
            ) : (
              courses.map((course, idx) => (
                <div className="job-card" key={course.id || idx}>
                  <div className="job-title">{course.title}</div>
                  <div className="job-meta">
                    <span>📍 {course.location}</span>
                    <span>• {course.type}</span>
                    <span>• 🗓 {course.startDate}</span>
                  </div>
                  <div className="job-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/course-view/${course.id}`, { state: { course, readOnly: true } })}
                    >
                      View
                    </button>
                    <button
                      className="close-btn"
                      onClick={() => navigate(`/course-update/${course.id}`, { state: { course, isUpdate: true } })}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
          {/* --- End of new sections --- */}
          <section className="recent-applications">
            <div className="recent-applications-header">
              <h3>Recent Applications</h3>
              <a href="#" className="view-all-link">View All</a>
            </div>
            {recentApplications.map((app, idx) => (
              <div className="recent-app-card" key={idx}>
                <img src={app.img} alt={app.name} className="recent-app-img" />
                <div className="recent-app_info">
                  <div className="recent-app-name">{app.name}</div>
                  <div className="recent-app_position">{app.position}</div>
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
    </div>
  );
}