import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageJob.css";

export default function ManageInternship({ internships, setInternships, updateInternship }) {
  const [loading, setLoading] = useState(true);
  const [editingInternship, setEditingInternship] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [viewInternship, setViewInternship] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!internships || internships.length === 0) {
      fetchInternships();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/manage/internship/all");
      setInternships(res.data);
    } catch (err) {
      setError("Failed to load internships.");
    }
    setLoading(false);
  };

  const handleView = (internship) => setViewInternship(internship);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;
    try {
      await axios.delete(`/manage/internship/${id}`);
      setInternships(internships.filter((i) => i.id !== id));
    } catch (err) {
      setError("Failed to delete internship.");
    }
  };

  const handleEdit = (internship) => {
    setEditingInternship(internship);
    setEditForm(internship);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSave = async () => {
    try {
      const res = await axios.put(`/manage/internship/${editingInternship.id}`, editForm);
      setInternships(internships.map(i => i.id === editingInternship.id ? res.data : i));
      if (updateInternship) updateInternship(res.data);
      setEditingInternship(null);
    } catch (err) {
      setError("Failed to update internship.");
    }
  };

  return (
    <div className="manage-job-container">
      <div className="manage-job-card">
        <h2 className="manage-job-title">Manage Posted Internships</h2>
        {loading ? (
          <div className="no-jobs-msg">Loading...</div>
        ) : internships.length === 0 ? (
          <div className="no-jobs-msg">No internships posted yet.</div>
        ) : (
          <div className="manage-job-list">
            {internships.map((internship) => (
              <div className="manage-job-item" key={internship.id}>
                <div className="manage-job-info">
                  <div className="manage-job-main">
                    <span className="manage-job-jobtitle">{internship.title}</span>
                    <span className="manage-job-company">{internship.company}</span>
                  </div>
                  <div className="manage-job-meta">
                    <span>📍 {internship.location}</span>
                    <span>• {internship.internshipType}</span>
                    <span>• Openings: {internship.openings}</span>
                  </div>
                </div>
                <div className="manage-job-actions">
                  <button
                    className="manage-job-btn view"
                    onClick={() => handleView(internship)}
                  >
                    View
                  </button>
                  <button
                    className="manage-job-btn update"
                    onClick={() => handleEdit(internship)}
                  >
                    Update
                  </button>
                  <button
                    className="manage-job-btn delete"
                    onClick={() => handleDelete(internship.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        {viewInternship && (
          <div className="manage-job-modal" onClick={() => setViewInternship(null)}>
            <div className="manage-job-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{viewInternship.title}</h3>
              <div><b>Company:</b> {viewInternship.company}</div>
              <div><b>Description:</b> {viewInternship.description}</div>
              <div><b>Skills:</b> {viewInternship.skills}</div>
              <div><b>Location:</b> {viewInternship.location}</div>
              <div><b>Type:</b> {viewInternship.internshipType}</div>
              <div><b>Mode:</b> {viewInternship.mode}</div>
              <div><b>Duration:</b> {viewInternship.duration}</div>
              <div><b>Stipend:</b> {viewInternship.stipend}</div>
              <div><b>Openings:</b> {viewInternship.openings}</div>
              <div><b>Start:</b> {viewInternship.startDate}</div>
              <div><b>Deadline:</b> {viewInternship.applicationDeadline}</div>
              <div><b>Responsibilities:</b> {viewInternship.responsibilities}</div>
              <div><b>Eligibility:</b> {viewInternship.eligibility}</div>
              <div><b>Perks:</b> {viewInternship.perks}</div>
              <div><b>Apply Link:</b> {viewInternship.applyLink}</div>
              <button className="manage-job-btn" onClick={() => setViewInternship(null)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {editingInternship && (
          <div className="manage-job-modal" onClick={() => setEditingInternship(null)}>
            <div className="manage-job-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Update Internship</h3>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="manage-job-modal-input"
                placeholder="Internship Title"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="manage-job-modal-input"
                placeholder="Description"
                rows={4}
              />
              {/* Add more fields as needed */}
              <div className="manage-job-modal-actions">
                <button className="manage-job-btn update" onClick={handleUpdateSave}>
                  Save
                </button>
                <button
                  className="manage-job-btn"
                  onClick={() => setEditingInternship(null)}
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