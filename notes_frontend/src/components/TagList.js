import React, { useContext, useEffect, useState } from "react";
import { getNotes } from "../api";
import { NotesContext } from "../pages/NotesPage";

/**
 * PUBLIC_INTERFACE
 * Tag list for navigation/filtering.
 */
function TagList() {
  const { setTag, tag: selectedTag } = useContext(NotesContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const notes = await getNotes();
        // Flatten all tags to get the set of unique tags.
        const allTags = Array.from(new Set(
          notes.flatMap((n) => (n.tags || []))
        ));
        setTags(allTags);
      } catch {
        setTags([]);
      }
    }
    fetchTags();
  }, []);

  return (
    <nav className="tag-list">
      <h3>Tags</h3>
      <button
        className={`tag-btn${selectedTag === null ? " active" : ""}`}
        onClick={() => setTag(null)}
      >All</button>
      {tags.map((t) => (
        <button
          className={`tag-btn${t === selectedTag ? " active" : ""}`}
          key={t}
          onClick={() => setTag(t)}
        >{t}</button>
      ))}
    </nav>
  );
}

export default TagList;
