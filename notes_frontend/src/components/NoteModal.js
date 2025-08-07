import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Modal dialog for creating and editing notes.
 */
function NoteModal({ open, onClose, mode, note, onSave }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [tags, setTags] = useState(note ? (note.tags || []).join(", ") : "");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setTags(note ? (note.tags || []).join(", ") : "");
  }, [note]);

  function handleSubmit(e) {
    e.preventDefault();
    // Convert tags string into array
    const tagsArr = tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      content: content.trim(),
      tags: tagsArr,
    });
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <h2>{mode === "edit" ? "Edit Note" : "New Note"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              required
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={128}
            />
          </label>
          <label>
            Content
            <textarea
              required
              value={content}
              rows={7}
              onChange={e => setContent(e.target.value)}
              maxLength={10000}
            />
          </label>
          <label>
            Tags (comma-separated)
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="e.g. work, personal"
            />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="modal-close-btn">
              Cancel
            </button>
            <button type="submit" className="modal-submit-btn">
              {mode === "edit" ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NoteModal;
