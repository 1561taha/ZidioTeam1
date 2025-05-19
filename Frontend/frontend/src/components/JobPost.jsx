import React, { useState } from "react";
import "./JobPost.css";

export default function JobPost() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    employmentType: "",
    location: "",
    salary: "",
    description: "",
    qualifications: "",
    experience: "",
    skills: "",
    deadline: "",
    openings: "", // <-- Add this line
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Job posted successfully!");
    setTimeout(() => setMessage(""), 3000);
    setJob({
      title: "",
      company: "",
      employmentType: "",
      location: "",
      salary: "",
      description: "",
      qualifications: "",
      experience: "",
      skills: "",
      deadline: "",
      openings: "", // <-- Add this line
    });
  };

  return (
    <div className="job-post-container">
      <div className="job-post-card">
        {/* <div className="job-post-tabs">
          <div className="job-post-tab">User Info</div>
        </div> */}
        <h2 className="job-post-title">Post a New Job</h2>
        <form className="job-post-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={job.company}
                onChange={handleChange}
                placeholder="e.g. TechCorp Inc."
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Employment Type</label>
              <select
                name="employmentType"
                value={job.employmentType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                placeholder="e.g. Remote, New York"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                placeholder="e.g. $60,000 - $80,000"
              />
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={job.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>No. of Openings</label>
              <input
                type="number"
                name="openings"
                value={job.openings}
                onChange={handleChange}
                placeholder="e.g. 5"
                min={1}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Describe the job role and responsibilities..."
              rows={4}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Qualifications</label>
              <textarea
                name="qualifications"
                value={job.qualifications}
                onChange={handleChange}
                placeholder="List the required qualifications..."
                rows={2}
                required
              />
            </div>
            <div className="form-group">
              <label>Experience Required</label>
              <input
                type="text"
                name="experience"
                value={job.experience}
                onChange={handleChange}
                placeholder="e.g. 2+ years in React"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Skills Required</label>
            <textarea
              name="skills"
              value={job.skills}
              onChange={handleChange}
              placeholder="e.g. React, JavaScript, CSS"
              rows={2}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>Application Link</label>
            <input
              type="url"
              name="applyLink"
              value={job.applyLink}
              onChange={handleChange}
              placeholder="e.g. https://company.com/apply"
              required
            />
          </div> */}
          <button className="job-post-btn" type="submit">
            Post Job
          </button>
          {message && <div className="job-post-success">{message}</div>}
        </form>
      </div>
    </div>
  );
}