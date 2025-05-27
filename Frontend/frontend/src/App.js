import React, { useContext, useState, useCallback } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";

import StudentProfile from "./components/StudentProfile";
import StudentDashboard from "./components/StudentDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import RecruiterProfile from "./components/RecruiterProfile";

import CompanyProfile from "./components/CompanyProfile";
import "./App.css";
import JobPost from "./components/JobPost";
import InternshipPost from "./components/InternshipPost";
import ManageJob from "./components/ManageJob";
import ManageInternship from "./components/ManageInternship";
import HackathonPost from "./components/HackathonPost";
import ManageHackathon from "./components/ManageHackathon";
import CoursePost from "./components/CoursePost";
import ManageCourse from "./components/ManageCourse";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/recruiter-dashboard");

  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [courses, setCourses] = useState([]);

  const updateJob = (updatedJob) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === updatedJob.id ? { ...updatedJob } : job
      )
    );
  };

  const addJob = (job) => setJobs(prev => [job, ...prev]);

  const updateInternship = (updatedInternship) => {
    setInternships(prev =>
      prev.map(internship =>
        internship.id === updatedInternship.id ? { ...updatedInternship } : internship
      )
    );
  };

  const addInternship = (internship) => setInternships(prev => [internship, ...prev]);
  const addHackathon = (hackathon) => setHackathons(prev => [hackathon, ...prev]);
  const addCourse = (course) => setCourses(prev => [course, ...prev]);

  return (
    <div className="app">
      {!hideHeader && <Header />}
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === "ROLE_Student" ? "/student-dashboard" : "/recruiter-dashboard"} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === "ROLE_Student" ? "/student-dashboard" : "/recruiter-dashboard"} />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected student routes */}
          <Route path="/student-dashboard" element={<ProtectedRoute role="ROLE_Student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student-profile" element={<ProtectedRoute role="ROLE_Student"><StudentProfile /></ProtectedRoute>} />

          {/* Protected recruiter routes */}
          <Route path="/recruiter-dashboard" element={<ProtectedRoute role="ROLE_Recruiter"><RecruiterDashboard jobs={jobs} /></ProtectedRoute>} />
          <Route path="/recruiter-profile" element={<ProtectedRoute role="ROLE_Recruiter"><RecruiterProfile /></ProtectedRoute>} />

          {/* Shared/other routes */}
          
          <Route path="/view-profile" element={<ProtectedRoute><CompanyProfile/></ProtectedRoute>} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route
  path="/job-post"
  element={<JobPost addJob={addJob} updateJob={updateJob} />}
/>
          <Route
  path="/manage-job"
  element={<ManageJob jobs={jobs} setJobs={setJobs} updateJob={updateJob} />}
/>
          <Route
  path="/internship-post"
  element={<InternshipPost addInternship={addInternship} updateInternship={updateInternship} />}
/>
          <Route
  path="/manage-internship"
  element={<ManageInternship internships={internships} setInternships={setInternships} updateInternship={updateInternship} />}
/>
          <Route path="/job-view/:id" element={<JobPost />} />
          <Route path="/job-update/:id" element={<JobPost updateJob={updateJob} />} />
          <Route
  path="/internship-view/:id"
  element={<InternshipPost />}
/>
          <Route
  path="/internship-update/:id"
  element={<InternshipPost updateInternship={updateInternship} />}
/>
          <Route
  path="/hackathon-post"
  element={<HackathonPost addHackathon={addHackathon} />}
/>
          <Route
  path="/manage-hackathon"
  element={<ManageHackathon hackathons={hackathons} setHackathons={setHackathons} />}
/>
          <Route
  path="/course-post"
  element={<CoursePost addCourse={addCourse} />}
/>
          <Route
  path="/manage-course"
  element={<ManageCourse courses={courses} setCourses={setCourses} />}
/>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? (user.role === "ROLE_Student" ? "/student-dashboard" : "/recruiter-dashboard") : "/login"} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;