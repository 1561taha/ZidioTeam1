import React, { useState } from "react";
import "./ManageJob.css";

export default function ManageJob() {
  // Example initial jobs (replace with API data in real app)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Zidio Pvt Ltd",
      location: "Remote",
      type: "Full-time",
      postedOn: "2025-05-19",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Zidio Pvt Ltd",
      location: "Bangalore",
      type: "Part-time",
      postedOn: "2025-05-18",
    },
  ]);

  // For update modal (simple example)
  const [editingJob, setEditingJob] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleView = (job) => {
    alert(`Viewing job: ${job.title}`);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setEditTitle(job.title);
  };

  const handleUpdate = () => {
    setJobs(
      jobs.map((job) =>
        job.id === editingJob.id ? { ...job, title: editTitle } : job
      )
    );
    setEditingJob(null);
    setEditTitle("");
  };

  return (
    <div className="manage-job-container">
      <div className="manage-job-card">
        <h2 className="manage-job-title">Manage Posted Jobs</h2>
        {jobs.length === 0 ? (
          <div className="no-jobs-msg">No jobs posted yet.</div>
        ) : (
          <div className="manage-job-list">
            {jobs.map((job) => (
              <div className="manage-job-item" key={job.id}>
                <div className="manage-job-info">
                  <div className="manage-job-main">
                    <span className="manage-job-jobtitle">{job.title}</span>
                    <span className="manage-job-company">{job.company}</span>
                  </div>
                  <div className="manage-job-meta">
                    <span>📍 {job.location}</span>
                    <span>• {job.type}</span>
                    <span>• Posted: {job.postedOn}</span>
                  </div>
                </div>
                <div className="manage-job-actions">
                  <button
                    className="manage-job-btn view"
                    onClick={() => handleView(job)}
                  >
                    View
                  </button>
                  <button
                    className="manage-job-btn update"
                    onClick={() => handleEdit(job)}
                  >
                    Update
                  </button>
                  <button
                    className="manage-job-btn delete"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simple Update Modal */}
        {editingJob && (
          <div className="manage-job-modal">
            <div className="manage-job-modal-content">
              <h3>Update Job Title</h3>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="manage-job-modal-input"
              />
              <div className="manage-job-modal-actions">
                <button className="manage-job-btn update" onClick={handleUpdate}>
                  Save
                </button>
                <button
                  className="manage-job-btn"
                  onClick={() => setEditingJob(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}