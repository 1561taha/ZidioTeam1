import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./JobPost.css";
import axios from "axios";

const initialState = {
  title: "",
  company: "",
  location: "",
  internshipType: "",
  mode: "",
  duration: "",
  stipend: "",
  openings: "",
  startDate: "",
  applicationDeadline: "",
  description: "",
  responsibilities: "",
  eligibility: "",
  perks: "",
  skills: "",
  applyLink: "",
};

export default function InternshipPost({ addInternship, updateInternship }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { internship, readOnly, isUpdate } = location.state || {};

  const [form, setForm] = useState(internship || initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (internship) setForm(internship);
  }, [internship]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      if (isUpdate) {
        // Update internship in backend
        const res = await axios.put(`/manage/internship/${form.id}`, form);
        if (updateInternship) updateInternship(res.data);
        setMessage("Internship updated successfully!");
        setTimeout(() => navigate("/manage-internship"), 1000);
      } else {
        // Post new internship
        const res = await axios.post("/manage/internship", form);
        setMessage("Internship posted successfully!");
        if (addInternship) addInternship(res.data);
        setTimeout(() => navigate("/manage-internship"), 1000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to post/update internship. Please check all fields."
      );
    }
    setLoading(false);
  };

  return (
    <div className="job-post-container">
      <div className="job-post-card">
        <div className="job-post-tabs">
          <div className="job-post-tab">
            {readOnly
              ? "View Internship"
              : isUpdate
              ? "Update Internship"
              : "Post a New Internship"}
          </div>
        </div>
        <form className="job-post-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Internship Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Marketing Intern"
                required
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Zidio Pvt Ltd"
                required
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Mumbai"
                required
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Internship Type</label>
              <select
                name="internshipType"
                value={form.internshipType}
                onChange={handleChange}
                required
                disabled={readOnly}
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mode</label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                required
                disabled={readOnly}
              >
                <option value="">Select Mode</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 6 weeks"
                required
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Stipend</label>
              <input
                type="text"
                name="stipend"
                value={form.stipend}
                onChange={handleChange}
                placeholder="e.g. ₹10,000/month or Unpaid"
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Number of Openings</label>
              <input
                type="number"
                name="openings"
                value={form.openings}
                onChange={handleChange}
                placeholder="e.g. 5"
                min={1}
                required
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={form.applicationDeadline}
                onChange={handleChange}
                required
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Internship Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the internship role and expectations..."
              rows={3}
              required
              disabled={readOnly}
            />
          </div>
          <div className="form-group">
            <label>Responsibilities</label>
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={handleChange}
              placeholder="List the responsibilities..."
              rows={2}
              required
              disabled={readOnly}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Eligibility Criteria</label>
              <textarea
                name="eligibility"
                value={form.eligibility}
                onChange={handleChange}
                placeholder="e.g. Only final year students"
                rows={2}
                required
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Perks</label>
              <input
                type="text"
                name="perks"
                value={form.perks}
                onChange={handleChange}
                placeholder="e.g. Certificate, PPO, Flexible Hours"
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Skills Required</label>
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. Python, Communication, MS Excel"
              rows={2}
              required
              disabled={readOnly}
            />
          </div>
          {/* <div className="form-group">
            <label>Application Link</label>
            <input
              type="url"
              name="applyLink"
              value={form.applyLink}
              onChange={handleChange}
              placeholder="e.g. https://company.com/apply"
              required
              disabled={readOnly}
            />
          </div> */}
          <button
            className="job-post-btn"
            type="submit"
            disabled={loading || readOnly}
          >
            {loading
              ? isUpdate
                ? "Updating..."
                : "Posting..."
              : isUpdate
              ? "Update Internship"
              : "Post Internship"}
          </button>
          {message && <div className="job-post-success">{message}</div>}
          {error && (
            <div
              className="job-post-success"
              style={{ color: "#ef4444" }}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}