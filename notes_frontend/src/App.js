import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import NotesPage from "./pages/NotesPage";
import AuthPage from "./pages/AuthPage";
import { getCurrentUser, logout } from "./api";

export const AuthContext = React.createContext();
/**
 * PUBLIC_INTERFACE
 * The root app with routing, global layout, and auth context.
 */
function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check logged-in status on startup.
    (async () => {
      try {
        const me = await getCurrentUser();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
  }

  if (!authChecked) {
    // App initializing...
    return (
      <div className="centered-loader">
        <div className="loader" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      <Router>
        {user && <Sidebar />}
        <main className={`main-content ${user ? "with-sidebar" : ""}`}>
          {user && <Topbar />}
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage mode="login" />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <AuthPage mode="signup" />} />
            <Route
              path="/*"
              element={
                user ? <NotesPage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
