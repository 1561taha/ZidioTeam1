import React from "react";

export default function ManageHackathon({ hackathons = [], setHackathons }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hackathon?")) {
      setHackathons(hackathons.filter(h => h.id !== id));
    }
  };

  return (
    <div className="manage-job-container">
      <div className="manage-job-card">
        <h2 className="manage-job-title">Manage Posted Hackathons</h2>
        {hackathons.length === 0 ? (
          <div className="no-jobs-msg">No hackathons posted yet.</div>
        ) : (
          <div className="manage-job-list">
            {hackathons.map((hackathon) => (
              <div className="manage-job-item" key={hackathon.id}>
                <div className="manage-job-info">
                  <div className="manage-job-main">
                    <span className="manage-job-jobtitle">{hackathon.title}</span>
                    <span className="manage-job-company">{hackathon.organizer}</span>
                  </div>
                  <div className="manage-job-meta">
                    <span>📍 {hackathon.location}</span>
                    <span>• {hackathon.mode}</span>
                    <span>• 🗓 {hackathon.startDate} - {hackathon.endDate}</span>
                  </div>
                </div>
                <div className="manage-job-actions">
                  <button
                    className="manage-job-btn view"
                    onClick={() => alert(
                      `Title: ${hackathon.title}\nOrganizer: ${hackathon.organizer}\nLocation: ${hackathon.location}\nMode: ${hackathon.mode}\nStart: ${hackathon.startDate}\nEnd: ${hackathon.endDate}\nDescription: ${hackathon.description}`
                    )}
                  >
                    View
                  </button>
                  <button
                    className="manage-job-btn delete"
                    onClick={() => handleDelete(hackathon.id)}
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