import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import Profile from "./components/Profile";
import StudentProfile from "./components/StudentProfile";
import StudentDashboard from "./components/StudentDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import RecruiterProfile from "./components/RecruiterProfile";

import CompanyProfile from "./components/CompanyProfile";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/recruiter-dashboard");

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
          <Route path="/recruiter-dashboard" element={<ProtectedRoute role="ROLE_Recruiter"><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter-profile" element={<ProtectedRoute role="ROLE_Recruiter"><RecruiterProfile /></ProtectedRoute>} />

          {/* Shared/other routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/view-profile" element={<ProtectedRoute><CompanyProfile/></ProtectedRoute>} />
          <Route path="/company-profile" element={<CompanyProfile />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? (user.role === "ROLE_Student" ? "/student-dashboard" : "/recruiter-dashboard") : "/login"} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;