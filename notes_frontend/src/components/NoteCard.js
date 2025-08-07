import React from "react";

/**
 * PUBLIC_INTERFACE
 * Renders a single note in list/grid view.
 */
function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card" tabIndex={0} aria-label={note.title}>
      <div className="note-card-header">
        <h4>{note.title}</h4>
        <div className="note-card-actions">
          <button title="Edit" onClick={onEdit} className="note-edit-btn">✏️</button>
          <button title="Delete" onClick={onDelete} className="note-delete-btn">🗑️</button>
        </div>
      </div>
      <div className="note-card-content">{note.content?.slice(0, 180)}{note.content?.length > 180 ? "…" : ""}</div>
      {note.tags && note.tags.length > 0 && (
        <div className="note-card-tags">
          {note.tags.map((t) => (
            <span className="note-tag" key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
export default NoteCard;
