import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageJob.css";

export default function ManageJob({ jobs, setJobs, updateJob }) {
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [viewJob, setViewJob] = useState(null);
  const [error, setError] = useState("");

  // Fetch jobs from backend if jobs are empty
  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      fetchJobs();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/manage/job/all");
      setJobs(res.data);
    } catch (err) {
      setError("Failed to load jobs.");
    }
    setLoading(false);
  };

  const handleView = (job) => {
    setViewJob(job);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`/manage/job/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      setError("Failed to delete job.");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditDescription(job.description);
  };

  // Inline update handler
  const handleUpdateSave = async () => {
    try {
      const res = await axios.put(`/manage/job/${editingJob.id}`, {
        ...editingJob,
        title: editTitle,
        description: editDescription,
      });
      setJobs(jobs.map(job => job.id === editingJob.id ? res.data : job));
      if (updateJob) updateJob(res.data);
      setEditingJob(null);
    } catch (err) {
      setError("Failed to update job.");
    }
  };

  return (
    <div className="manage-job-container">
      <div className="manage-job-card">
        <h2 className="manage-job-title">Manage Posted Jobs</h2>
        {loading ? (
          <div className="no-jobs-msg">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs-msg">No jobs posted yet.</div>
        ) : (
          <div className="manage-job-list">
            {jobs.map((job) => (
              <div className="manage-job-item" key={job.id}>
                <div className="manage-job-info">
                  <div className="manage-job-main">
                    <span className="manage-job-jobtitle">{job.title}</span>
                    <span className="manage-job-company">{job.companyName}</span>
                  </div>
                  <div className="manage-job-meta">
                    <span>📍 {job.location}</span>
                    <span>• {job.jobType}</span>
                    <span>• Openings: {job.openings}</span>
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

        {/* View Modal */}
        {viewJob && (
          <div className="manage-job-modal" onClick={() => setViewJob(null)}>
            <div className="manage-job-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{viewJob.title}</h3>
              <div><b>Company:</b> {viewJob.companyName}</div>
              <div><b>Description:</b> {viewJob.description}</div>
              <div><b>Skills:</b> {viewJob.skills?.join(", ")}</div>
              <div><b>Location:</b> {viewJob.location}</div>
              <div><b>Type:</b> {viewJob.jobType}</div>
              <div><b>Salary:</b> {viewJob.salaryRange}</div>
              <div><b>Qualifications:</b> {viewJob.qualifications?.join(", ")}</div>
              <div><b>Experience Level:</b> {viewJob.experienceLevel}</div>
              <div><b>Openings:</b> {viewJob.openings}</div>
              <div><b>Start:</b> {viewJob.startDate?.slice(0, 10)}</div>
              <div><b>End:</b> {viewJob.endDate?.slice(0, 10)}</div>
              <button className="manage-job-btn" onClick={() => setViewJob(null)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {editingJob && (
          <div className="manage-job-modal" onClick={() => setEditingJob(null)}>
            <div className="manage-job-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Update Job</h3>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="manage-job-modal-input"
                placeholder="Job Title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="manage-job-modal-input"
                placeholder="Description"
                rows={4}
              />
              <div className="manage-job-modal-actions">
                <button className="manage-job-btn update" onClick={handleUpdateSave}>
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
        {error && <div className="no-jobs-msg" style={{ color: "#ef4444" }}>{error}</div>}
      </div>
    </div>
  );
}