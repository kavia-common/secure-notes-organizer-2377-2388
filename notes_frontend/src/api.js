//
// PUBLIC_INTERFACE
// API utility for interacting with the notes_backend REST API.
//
// Handles JWT authentication, request/response, and provides helper functions
// for authentication and CRUD operations for secure notes.
//
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function getToken() {
  return window.localStorage.getItem("jwt_token");
}

function setToken(token) {
  window.localStorage.setItem("jwt_token", token);
}

function clearToken() {
  window.localStorage.removeItem("jwt_token");
}

async function apiRequest(method, path, { data, params } = {}) {
  let url = API_URL + path;
  if (params) {
    const q = new URLSearchParams(params);
    url += "?" + q.toString();
  }
  const headers = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    method: method.toUpperCase(),
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
  let out;
  try {
    out = await response.json();
  } catch {
    out = undefined;
  }
  if (!response.ok) {
    const err = new Error(out?.message || response.statusText);
    err.status = response.status;
    throw err;
  }
  return out;
}

// PUBLIC_INTERFACE
export async function signup({ username, password }) {
  /**
   * Register a new user. Returns user and JWT token.
   */
  const res = await apiRequest("POST", "/auth/signup", {
    data: { username, password },
  });
  setToken(res.token);
  return res.user;
}

// PUBLIC_INTERFACE
export async function login({ username, password }) {
  /**
   * Login and retrieve token. Returns user and saves token.
   */
  const res = await apiRequest("POST", "/auth/login", {
    data: { username, password },
  });
  setToken(res.token);
  return res.user;
}

// PUBLIC_INTERFACE
export function logout() {
  /**
   * Logout and clear JWT.
   */
  clearToken();
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /**
   * Returns current user info if authenticated.
   */
  return await apiRequest("GET", "/auth/whoami");
}

// PUBLIC_INTERFACE
export async function getNotes(filters) {
  /**
   * List notes. Optional filters: tag, title, search.
   */
  return await apiRequest("GET", "/notes", { params: filters });
}

// PUBLIC_INTERFACE
export async function createNote({ title, content, tags }) {
  /**
   * Create a note.
   */
  return await apiRequest("POST", "/notes", {
    data: { title, content, tags },
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id, { title, content, tags }) {
  /**
   * Update a note by ID.
   */
  return await apiRequest("PUT", `/notes/${id}`, {
    data: { title, content, tags },
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /**
   * Delete a note by ID.
   */
  return await apiRequest("DELETE", `/notes/${id}`);
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /**
   * Get a note by ID.
   */
  return await apiRequest("GET", `/notes/${id}`);
}
