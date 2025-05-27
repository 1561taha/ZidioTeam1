import React from "react";

export default function ManageCourse({ courses = [], setCourses }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="manage-job-container">
      <div className="manage-job-card">
        <h2 className="manage-job-title">Manage Posted Courses</h2>
        {courses.length === 0 ? (
          <div className="no-jobs-msg">No courses posted yet.</div>
        ) : (
          <div className="manage-job-list">
            {courses.map((course) => (
              <div className="manage-job-item" key={course.id}>
                <div className="manage-job-info">
                  <div className="manage-job-main">
                    <span className="manage-job-jobtitle">{course.title}</span>
                    <span className="manage-job-company">{course.provider}</span>
                  </div>
                  <div className="manage-job-meta">
                    <span>📍 {course.location}</span>
                    <span>• {course.mode}</span>
                    <span>• 🗓 {course.startDate} - {course.endDate}</span>
                  </div>
                </div>
                <div className="manage-job-actions">
                  <button
                    className="manage-job-btn view"
                    onClick={() => alert(
                      `Title: ${course.title}\nProvider: ${course.provider}\nLocation: ${course.location}\nMode: ${course.mode}\nStart: ${course.startDate}\nEnd: ${course.endDate}\nDescription: ${course.description}`
                    )}
                  >
                    View
                  </button>
                  <button
                    className="manage-job-btn delete"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}