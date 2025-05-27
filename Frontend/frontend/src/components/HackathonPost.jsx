import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HackathonPost.css";

export default function HackathonPost({ addHackathon }) {
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState({
    title: "",
    organizer: "",
    mode: "",
    location: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    description: "",
    eligibility: "",
    prizes: "",
    teamSize: "",
    website: "",
    contactEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setHackathon({ ...hackathon, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate backend post, then update parent state and navigate
    if (addHackathon) {
      // You may want to generate a unique id here
      addHackathon({ ...hackathon, id: Date.now() });
    }
    setMessage("Hackathon posted successfully!");
    setTimeout(() => {
      setMessage("");
      navigate("/manage-hackathon");
    }, 1000);
    setHackathon({
      title: "",
      organizer: "",
      mode: "",
      location: "",
      startDate: "",
      endDate: "",
      registrationDeadline: "",
      description: "",
      eligibility: "",
      prizes: "",
      teamSize: "",
      website: "",
      contactEmail: "",
    });
  };

  return (
    <div className="hackathon-post-container">
      <div className="hackathon-post-card">
        <div className="hackathon-post-tabs">
          <div className="hackathon-post-tab">Hackathon Info</div>
        </div>
        <h2 className="hackathon-post-title">Post a New Hackathon</h2>
        <form className="hackathon-post-form" onSubmit={handleSubmit}>
          <div className="hackathon-form-row">
            <div className="hackathon-form-group">
              <label>Hackathon Title</label>
              <input
                type="text"
                name="title"
                value={hackathon.title}
                onChange={handleChange}
                placeholder="e.g. CodeSprint 2025"
                required
              />
            </div>
            <div className="hackathon-form-group">
              <label>Organizer</label>
              <input
                type="text"
                name="organizer"
                value={hackathon.organizer}
                onChange={handleChange}
                placeholder="e.g. Zidio Pvt Ltd"
                required
              />
            </div>
          </div>
          <div className="hackathon-form-row">
            <div className="hackathon-form-group">
              <label>Mode</label>
              <select
                name="mode"
                value={hackathon.mode}
                onChange={handleChange}
                required
              >
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="hackathon-form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={hackathon.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Mumbai"
                required={hackathon.mode !== "Online"}
                disabled={hackathon.mode === "Online"}
              />
            </div>
          </div>
          <div className="hackathon-form-row">
            <div className="hackathon-form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={hackathon.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="hackathon-form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={hackathon.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="hackathon-form-row">
            <div className="hackathon-form-group">
              <label>Registration Deadline</label>
              <input
                type="date"
                name="registrationDeadline"
                value={hackathon.registrationDeadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="hackathon-form-group">
              <label>Team Size</label>
              <input
                type="text"
                name="teamSize"
                value={hackathon.teamSize}
                onChange={handleChange}
                placeholder="e.g. 1-4"
                required
              />
            </div>
          </div>
          <div className="hackathon-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={hackathon.description}
              onChange={handleChange}
              placeholder="Describe the hackathon, theme, and rules..."
              rows={3}
              required
            />
          </div>
          <div className="hackathon-form-row">
            <div className="hackathon-form-group">
              <label>Eligibility</label>
              <input
                type="text"
                name="eligibility"
                value={hackathon.eligibility}
                onChange={handleChange}
                placeholder="e.g. Open to all students"
                required
              />
            </div>
            <div className="hackathon-form-group">
              <label>Prizes</label>
              <input
                type="text"
                name="prizes"
                value={hackathon.prizes}
                onChange={handleChange}
                placeholder="e.g. ₹1,00,000, Goodies"
                required
              />
            </div>
          </div>
          <div className="hackathon-form-row">
            <div className="hackathon-form-group">
              <label>Website / Registration Link</label>
              <input
                type="url"
                name="website"
                value={hackathon.website}
                onChange={handleChange}
                placeholder="e.g. https://hackathon.com/register"
                required
              />
            </div>
            <div className="hackathon-form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={hackathon.contactEmail}
                onChange={handleChange}
                placeholder="e.g. info@hackathon.com"
                required
              />
            </div>
          </div>
          <button className="hackathon-post-btn" type="submit">
            Post Hackathon
          </button>
          {message && <div className="hackathon-post-success">{message}</div>}
        </form>
      </div>
    </div>
  );
}