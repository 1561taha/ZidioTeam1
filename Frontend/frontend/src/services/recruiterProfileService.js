import api from "./api"; // Make sure you have an api.js that exports your axios instance

export function getRecruiterProfile() {
  return api.get("/recruiter/profile");
}

export function updateRecruiterProfile(profile) {
  return api.put("/recruiter/profile", profile);
}