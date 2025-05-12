import api from "./api";

// Registration
export function register({ username, email, password, role }) {
  return api.post("/user/register", { username, email, password, role });
}

// Login
export function login({ username, password }) {
  return api.post("/user/login", { username, password });
}
