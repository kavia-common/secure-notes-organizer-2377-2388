import React, { useContext } from "react";
import { NotesContext } from "../pages/NotesPage";

/**
 * PUBLIC_INTERFACE
 * The topbar for search, sort, and create controls.
 */
function Topbar() {
  const { setSearch, onNewNote } = useContext(NotesContext);

  return (
    <header className="topbar">
      <input
        className="topbar-search"
        placeholder="Search notes..."
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      <button className="notes-create-btn" onClick={onNewNote}>+ New Note</button>
    </header>
  );
}

export default Topbar;
