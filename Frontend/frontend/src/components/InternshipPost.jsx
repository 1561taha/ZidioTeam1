import React, { useState } from "react";
import "./JobPost.css"; // You can create InternshipPost.css if you want different styles

export default function InternshipPost() {
  const [internship, setInternship] = useState({
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
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInternship({ ...internship, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Internship posted successfully!");
    setTimeout(() => setMessage(""), 3000);
    setInternship({
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
    });
  };

  return (
    <div className="job-post-container">
      <div className="job-post-card">
        <div className="job-post-tabs">
          <div className="job-post-tab">Internship Info</div>
        </div>
        <h2 className="job-post-title">Post a New Internship</h2>
        <form className="job-post-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Internship Title</label>
              <input
                type="text"
                name="title"
                value={internship.title}
                onChange={handleChange}
                placeholder="e.g. Marketing Intern"
                required
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={internship.company}
                onChange={handleChange}
                placeholder="e.g. Zidio Pvt Ltd"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={internship.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Mumbai"
                required
              />
            </div>
            <div className="form-group">
              <label>Internship Type</label>
              <select
                name="internshipType"
                value={internship.internshipType}
                onChange={handleChange}
                required
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
                value={internship.mode}
                onChange={handleChange}
                required
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
                value={internship.duration}
                onChange={handleChange}
                placeholder="e.g. 6 weeks"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Stipend</label>
              <input
                type="text"
                name="stipend"
                value={internship.stipend}
                onChange={handleChange}
                placeholder="e.g. ₹10,000/month or Unpaid"
              />
            </div>
            <div className="form-group">
              <label>Number of Openings</label>
              <input
                type="number"
                name="openings"
                value={internship.openings}
                onChange={handleChange}
                placeholder="e.g. 5"
                min={1}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={internship.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={internship.applicationDeadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Internship Description</label>
            <textarea
              name="description"
              value={internship.description}
              onChange={handleChange}
              placeholder="Describe the internship role and expectations..."
              rows={3}
              required
            />
          </div>
          <div className="form-group">
            <label>Responsibilities</label>
            <textarea
              name="responsibilities"
              value={internship.responsibilities}
              onChange={handleChange}
              placeholder="List the responsibilities..."
              rows={2}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Eligibility Criteria</label>
              <textarea
                name="eligibility"
                value={internship.eligibility}
                onChange={handleChange}
                placeholder="e.g. Only final year students"
                rows={2}
                required
              />
            </div>
            <div className="form-group">
              <label>Perks</label>
              <input
                type="text"
                name="perks"
                value={internship.perks}
                onChange={handleChange}
                placeholder="e.g. Certificate, PPO, Flexible Hours"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Skills Required</label>
            <textarea
              name="skills"
              value={internship.skills}
              onChange={handleChange}
              placeholder="e.g. Python, Communication, MS Excel"
              rows={2}
              required
            />
          </div>
          <div className="form-group">
            <label>Application Link</label>
            <input
              type="url"
              name="applyLink"
              value={internship.applyLink}
              onChange={handleChange}
              placeholder="e.g. https://company.com/apply"
              required
            />
          </div>
          <button className="job-post-btn" type="submit">
            Post Internship
          </button>
          {message && <div className="job-post-success">{message}</div>}
        </form>
      </div>
    </div>
  );
}