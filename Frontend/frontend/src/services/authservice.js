import api from "./api";

// Registration
export function register({ username, email, password, role }) {
  return api.post("/user/register", { username, email, password, role });
}

// Login
export async function login({ username, password, role }) {
  // send username, password *and* role (if your backend needs it)
  const response = await api.post("/user/login", {
    username,
    password,
    role,
  });

  // axios wraps the real payload in `response.data`
  // we return exactly what the backend sends: { token, role }
  return response.data;
}

