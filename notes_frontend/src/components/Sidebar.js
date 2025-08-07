import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import TagList from "./TagList";

function Sidebar() {
  const { handleLogout, user } = useContext(AuthContext);
  const [show, setShow] = useState(window.innerWidth > 800);

  useEffect(() => {
    function onResize() {
      setShow(window.innerWidth > 800);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <aside className={`sidebar${show ? " open" : ""}`} data-testid="sidebar">
      <div className="sidebar-header">
        <h2>Secure Notes</h2>
        <button className="sidebar-toggle" onClick={() => setShow((v) => !v)}>
          {show ? "←" : "☰"}
        </button>
      </div>
      {show && (
        <>
          <div className="sidebar-user">
            <span>👤 {user?.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <TagList />
        </>
      )}
    </aside>
  );
}

export default Sidebar;
