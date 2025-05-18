import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";
import defaultPic from "../assets/defaultpic.png"; // Import the default profile picture

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

export default function StudentProfile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fname: "",
    email: "",
    phonenumber: "",
    dateofbirth: "",
    address: "",
    linkedln: "",
    githubid: "",
  });
  const [displayName, setDisplayName] = useState("Your Name");
  const [profilePic, setProfilePic] = useState(defaultPic);
  const [resumeFileName, setResumeFileName] = useState("");
  const [educationDetails, setEducationDetails] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const toggleEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      // On Save, update the display name with a generated school id
      setDisplayName(
        profileData.fname + "  (sch" + generateId() + ")"
      );
    }
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    } else {
      setResumeFileName("");
    }
  };

  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      startyear: "",
      endyear: "",
      percentage: "",
      editMode: false,
    };
    setEducationDetails([...educationDetails, newEducation]);
  };

  const toggleEducationEdit = (index) => {
    const newEducations = [...educationDetails];
    newEducations[index].editMode = !newEducations[index].editMode;
    setEducationDetails(newEducations);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educationDetails];
    newEducations[index][field] = value;
    setEducationDetails(newEducations);
  };

  const addExperience = () => {
    setExperienceDetails([
      ...experienceDetails,
      { company: "", role: "", start: "", end: "", description: "", editMode: true },
    ]);
  };

  const toggleExperienceEdit = (index) => {
    const newExperiences = [...experienceDetails];
    newExperiences[index].editMode = !newExperiences[index].editMode;
    setExperienceDetails(newExperiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experienceDetails];
    newExperiences[index][field] = value;
    setExperienceDetails(newExperiences);
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="student-profile-page">
      {/* <header className="dashboard-header">
        <div className="head">
          <img src={defaultPic} alt="Logo" className="logo" />
          <span>Student Profile</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header> */}
      <div className="container">
        <center>
          <h1 className="profileoverview">Profile Overview</h1>
          <div className="profile-wrapper">
            <label htmlFor="upload" className="profile-pic-label">
              <img id="profileImage" src={profilePic} alt="Profile" />
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
            </label>
            <div id="Name">{displayName}</div>
          </div>
          <div className="personaldiv">
            <h1 className="Personalinformation">Personal Information</h1>
            <br />
            <div className="card-container">
              <label htmlFor="fname">Full Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter Full-Name"
                value={profileData.fname}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={profileData.email}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
              <br />
              <label htmlFor="phonenumber">Phone number</label>
              <input
                type="number"
                id="phonenumber"
                name="phonenumber"
                placeholder="Enter Phone-Number"
                value={profileData.phonenumber}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
              <br />
              <label htmlFor="dateofbirth">Date of Birth</label>
              <input
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                placeholder="Select Date-of-Birth"
                value={profileData.dateofbirth}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
              <br />
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter Address"
                value={profileData.address}
                onChange={handleProfileChange}
                disabled={!editMode}
              ></textarea>
              <br />
              <label htmlFor="linkedln">Linkedln Id</label>
              <input
                type="url"
                id="linkedln"
                name="linkedln"
                placeholder="Type Linkedln ID"
                value={profileData.linkedln}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
              <br />
              <label htmlFor="githubid">Github Id</label>
              <input
                type="url"
                id="githubid"
                name="githubid"
                placeholder="Type Github ID"
                value={profileData.githubid}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
              <br />
              <label htmlFor="resumeattach">Upload Resume</label>
              <input
                type="file"
                id="resumeattach"
                name="resumeattach"
                accept=".pdf,.docx"
                onChange={handleResumeChange}
                disabled={!editMode}
              />
              <br />
              <span id="filename">{resumeFileName}</span>
              <br />
              <button id="editbutton" onClick={toggleEdit}>
                {editMode ? "Save Details" : "Edit Profile"}
              </button>
            </div>
          </div>
          <div className="educationdiv">
            <h1 className="educationdetails">Education Details</h1>
            {educationDetails.map((edu, index) => (
              <div key={index} className="educationdetailsdiv">
                <label>Enter Degree</label>
                <input
                  type="text"
                  placeholder="Enter Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  disabled={!edu.editMode}
                />
                <br />
                <label>Enter Institution</label>
                <input
                  type="text"
                  placeholder="Enter Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                  disabled={!edu.editMode}
                />
                <br />
                <label>Select Start year</label>
                <input
                  type="date"
                  value={edu.startyear}
                  onChange={(e) =>
                    handleEducationChange(index, "startyear", e.target.value)
                  }
                  disabled={!edu.editMode}
                />
                <br />
                <label>Select End year</label>
                <input
                  type="date"
                  value={edu.endyear}
                  onChange={(e) =>
                    handleEducationChange(index, "endyear", e.target.value)
                  }
                  disabled={!edu.editMode}
                />
                <br />
                <label>Enter Percentage</label>
                <input
                  type="number"
                  placeholder="Enter Percentage"
                  value={edu.percentage}
                  onChange={(e) =>
                    handleEducationChange(index, "percentage", e.target.value)
                  }
                  disabled={!edu.editMode}
                />
                <br />
                <button onClick={() => toggleEducationEdit(index)}>
                  {edu.editMode ? "Save" : "Edit"}
                </button>
              </div>
            ))}
            <center>
              <button id="addEducationButton" onClick={addEducation}>
                Add Education
              </button>
            </center>
          </div>

          {/* Experience Section */}
          <div className="experiencediv">
            <h1 className="experiencedetails">Experience</h1>
            {experienceDetails.map((exp, index) => (
              <div key={index} className="experiencedetailsdiv">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Enter Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                  disabled={!exp.editMode}
                />
                <br />
                <label>Role</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  value={exp.role}
                  onChange={(e) =>
                    handleExperienceChange(index, "role", e.target.value)
                  }
                  disabled={!exp.editMode}
                />
                <br />
                <label>Start Date</label>
                <input
                  type="date"
                  value={exp.start}
                  onChange={(e) =>
                    handleExperienceChange(index, "start", e.target.value)
                  }
                  disabled={!exp.editMode}
                />
                <br />
                <label>End Date</label>
                <input
                  type="date"
                  value={exp.end}
                  onChange={(e) =>
                    handleExperienceChange(index, "end", e.target.value)
                  }
                  disabled={!exp.editMode}
                />
                <br />
                <label>Description</label>
                <textarea
                  placeholder="Describe your work"
                  value={exp.description}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                  disabled={!exp.editMode}
                />
                <br />
                <button onClick={() => toggleExperienceEdit(index)}>
                  {exp.editMode ? "Save" : "Edit"}
                </button>
              </div>
            ))}
            <center>
              <button id="addExperienceButton" onClick={addExperience}>
                Add Experience
              </button>
            </center>
          </div>

          {/* Skills Section */}
          <div className="skillsdiv">
            <h1 className="skillsdetails">Skills</h1>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                disabled={!editMode}
              />
              <button onClick={addSkill} disabled={!editMode}>
                Add Skill
              </button>
            </div>
            <ul className="skills-list">
              {skills.map((skill, idx) => (
                <li key={idx}>
                  {skill}
                  {editMode && (
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => removeSkill(idx)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </center>
      </div>
    </div>
  );
}