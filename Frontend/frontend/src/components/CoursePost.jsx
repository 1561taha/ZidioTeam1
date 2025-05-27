import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CoursePost.css";

export default function CoursePost({ addCourse }) {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    provider: "",
    mode: "",
    location: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    description: "",
    eligibility: "",
    price: "",
    duration: "",
    certificate: "",
    website: "",
    contactEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ...post to backend if needed...
    if (addCourse) {
      addCourse({ ...course, id: Date.now() }); // Add unique id if needed
    }
    setMessage("Course posted successfully!");
    setTimeout(() => {
      setMessage("");
      navigate("/manage-course");
    }, 1000);
    // Reset form if desired
  };

  return (
    <div className="course-post-container">
      <div className="course-post-card">
        <div className="course-post-tabs">
          <div className="course-post-tab">Course Info</div>
        </div>
        <h2 className="course-post-title">Post a New Course</h2>
        <form className="course-post-form" onSubmit={handleSubmit}>
          <div className="course-form-row">
            <div className="course-form-group">
              <label>Course Title</label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                placeholder="e.g. Advanced React"
                required
              />
            </div>
            <div className="course-form-group">
              <label>Provider</label>
              <input
                type="text"
                name="provider"
                value={course.provider}
                onChange={handleChange}
                placeholder="e.g. Zidio Academy"
                required
              />
            </div>
          </div>
          <div className="course-form-row">
            <div className="course-form-group">
              <label>Mode</label>
              <select
                name="mode"
                value={course.mode}
                onChange={handleChange}
                required
              >
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="course-form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={course.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Mumbai"
                required={course.mode !== "Online"}
                disabled={course.mode === "Online"}
              />
            </div>
          </div>
          <div className="course-form-row">
            <div className="course-form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={course.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="course-form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={course.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="course-form-row">
            <div className="course-form-group">
              <label>Registration Deadline</label>
              <input
                type="date"
                name="registrationDeadline"
                value={course.registrationDeadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="course-form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                placeholder="e.g. 8 weeks"
                required
              />
            </div>
          </div>
          <div className="course-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              placeholder="Describe the course content and objectives..."
              rows={3}
              required
            />
          </div>
          <div className="course-form-row">
            <div className="course-form-group">
              <label>Eligibility</label>
              <input
                type="text"
                name="eligibility"
                value={course.eligibility}
                onChange={handleChange}
                placeholder="e.g. Open to all graduates"
                required
              />
            </div>
            <div className="course-form-group">
              <label>Certificate Provided</label>
              <select
                name="certificate"
                value={course.certificate}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="course-form-row">
            <div className="course-form-group">
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={course.price}
                onChange={handleChange}
                placeholder="e.g. ₹5000 or Free"
                required
              />
            </div>
            <div className="course-form-group">
              <label>Website / Registration Link</label>
              <input
                type="url"
                name="website"
                value={course.website}
                onChange={handleChange}
                placeholder="e.g. https://courses.com/register"
                required
              />
            </div>
          </div>
          <div className="course-form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={course.contactEmail}
              onChange={handleChange}
              placeholder="e.g. info@courses.com"
              required
            />
          </div>
          <button className="course-post-btn" type="submit">
            Post Course
          </button>
          {message && <div className="course-post-success">{message}</div>}
        </form>
      </div>
    </div>
  );
}