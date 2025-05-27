import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobPost.css";

const initialState = {
  title: "",
  companyName: "",
  description: "",
  skills: "",
  location: "",
  jobType: "",
  salary: "",
  qualifications: "",
  experienceLevel: "",
  startDate: "",
  openings: "",
  endDate: "",
};

export default function JobPost({ addJob, updateJob }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { job, readOnly, isUpdate } = location.state || {};

  const [form, setForm] = useState(job || initialState);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) setForm(job);
  }, [job]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    // Ensure skills and qualifications are always strings before splitting
    const skillsString =
      typeof form.skills === "string"
        ? form.skills
        : Array.isArray(form.skills)
        ? form.skills.join(",")
        : "";
    const qualificationsString =
      typeof form.qualifications === "string"
        ? form.qualifications
        : Array.isArray(form.qualifications)
        ? form.qualifications.join(",")
        : "";

    const payload = {
      ...form,
      skills: skillsString.split(",").map((s) => s.trim()).filter(Boolean),
      qualifications: qualificationsString.split(",").map((q) => q.trim()).filter(Boolean),
      salary: Number(form.salary),
      openings: Number(form.openings),
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      postedBy: "dummy", // Replace with actual user if needed
    };

    try {
      if (isUpdate) {
        // Update job in backend
        const res = await axios.put(`/manage/job/${form.id}`, payload);
        if (updateJob) updateJob(res.data);
        setSuccess("Job updated successfully!");
        setTimeout(() => navigate("/manage-job"), 1000);
      } else {
        // Post new job
        const res = await axios.post("/manage/job", payload);
        setSuccess("Job posted successfully!");
        if (addJob) addJob(res.data); // <-- Add to jobs state
        setTimeout(() => navigate("/manage-job"), 1000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to post/update job. Please check all fields."
      );
    }
    setLoading(false);
  };

  return (
    <div className="job-post-container">
      <div className="job-post-card">
        <div className="job-post-tabs">
          <div className="job-post-tab">
            {readOnly ? "View Job" : isUpdate ? "Update Job" : "Post a New Job"}
          </div>
        </div>
        <form className="job-post-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={255}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
                maxLength={255}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                maxLength={2000}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Skills <span style={{ fontWeight: 400 }}>(comma separated)</span></label>
              <input
                name="skills"
                value={
                  Array.isArray(form.skills)
                    ? form.skills.join(", ")
                    : form.skills
                }
                onChange={handleChange}
                required
                placeholder="e.g. React, Node.js, SQL"
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Qualifications <span style={{ fontWeight: 400 }}>(comma separated)</span></label>
              <input
                name="qualifications"
                value={
                  Array.isArray(form.qualifications)
                    ? form.qualifications.join(", ")
                    : form.qualifications
                }
                onChange={handleChange}
                required
                placeholder="e.g. B.Tech, M.Sc"
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                maxLength={255}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                required
                readOnly={readOnly}
                disabled={readOnly}
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Salary</label>
              <input
                name="salary"
                type="number"
                value={form.salary}
                onChange={handleChange}
                required
                min={0}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>Experience Level</label>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                required
                readOnly={readOnly}
                disabled={readOnly}
              >
                <option value="">Select</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                name="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={handleChange}
                required
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                required
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
            <div className="form-group">
              <label>No. of Openings</label>
              <input
                name="openings"
                type="number"
                value={form.openings}
                onChange={handleChange}
                required
                min={1}
                readOnly={readOnly}
                disabled={readOnly}
              />
            </div>
          </div>
          {!readOnly && (
            <button className="job-post-btn" type="submit" disabled={loading}>
              {loading ? (isUpdate ? "Updating..." : "Posting...") : (isUpdate ? "Update Job" : "Post Job")}
            </button>
          )}
          {success && <div className="job-post-success">{success}</div>}
          {error && <div className="job-post-success" style={{ color: "#ef4444" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}