import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import StudentProfile from "./components/StudentProfile";
import StudentDashboard from "./components/StudentDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import RecruiterDashboard from "./components/RecruiterDashboard";
import "./App.css";
import RecruiterProfile from "./components/RecruiterProfile";
import ViewProfile from "./components/ViewProfile";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter-profile" element={<RecruiterProfile />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
