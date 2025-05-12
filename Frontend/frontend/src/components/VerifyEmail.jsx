import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import "./VerifyEmail.css"; // Add styles for better layout
import Header from "./Header";
import Footer from "./Footer";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await api.get(`/user/verify?token=${token}`);
        setMessage(response.data || "Email verified successfully!");
      } catch (error) {
        setMessage(
          error.response?.data || "Verification failed. Invalid or expired token."
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <>
      <Header />
      <div className="verify-email-container">
        <div className="verify-email-box">
          <h2>Email Verification</h2>
          <p>{message}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}