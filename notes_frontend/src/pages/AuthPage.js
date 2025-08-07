import React, { useState, useContext } from "react";
import { login, signup } from "../api";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Authentication page for login and signup, minimal design.
 */
function AuthPage({ mode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const fn = mode === "signup" ? signup : login;
      const user = await fn({ username, password });
      setUser(user);
      navigate("/", { replace: true });
    } catch (error) {
      setErr(error.message || "Authentication error");
    }
  }
  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>
        <label>
          Username
          <input
            required
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </label>
        {err && <div className="auth-error">{err}</div>}
        <button className="auth-btn" type="submit">
          {mode === "signup" ? "Sign Up" : "Log In"}
        </button>
        <p>
          {mode === "signup" ? (
            <>
              Already have an account? <a href="/login">Log in</a>
            </>
          ) : (
            <>
              Don't have an account? <a href="/signup">Sign up</a>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
