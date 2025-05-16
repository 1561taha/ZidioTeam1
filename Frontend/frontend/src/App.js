// src/App.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={user ? <Navigate to="/student-dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/student-dashboard" /> : <Register />}
          />
          <Route
            path="/verify-email"
            element={user ? <Navigate to="/student-dashboard" /> : <VerifyEmail />}
          />

          {/* Unprotected */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/student-profile" element={<StudentProfile />} />

          {/* Protected */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter-dashboard"
            element={
              <ProtectedRoute>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch‑all redirect */}
          <Route
            path="*"
            element={<Navigate to={user ? "/student-dashboard" : "/login"} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
