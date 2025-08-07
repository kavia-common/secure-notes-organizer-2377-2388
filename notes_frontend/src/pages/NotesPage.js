import React, { useState, useEffect, createContext } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

export const NotesContext = createContext();

// PUBLIC_INTERFACE
// Page that loads/shows/manages notes
function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("new"); // or "edit"
  const [loading, setLoading] = useState(false);

  async function fetchNotes() {
    setLoading(true);
    try {
      const params = {};
      if (tag) params.tag = tag;
      if (search) params.search = search;
      const data = await getNotes(params);
      setNotes(data);
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, [tag, search]);

  function onNewNote() {
    setSelectedNote(null);
    setModalMode("new");
    setModalOpen(true);
  }
  function onEditNote(note) {
    setSelectedNote(note);
    setModalMode("edit");
    setModalOpen(true);
  }
  async function onDeleteNote(id) {
    await deleteNote(id);
    fetchNotes();
  }
  async function onSaveNote(noteData) {
    if (modalMode === "new") {
      await createNote(noteData);
    } else if (modalMode === "edit" && selectedNote) {
      await updateNote(selectedNote.id, noteData);
    }
    setModalOpen(false);
    fetchNotes();
  }

  return (
    <NotesContext.Provider value={{
      setSearch, setTag, tag,
      onNewNote,
    }}>
      <div className="notes-page">
        {loading && <div className="loading-spinner" />}
        <div className="notes-list-container">
          {notes.length === 0 && !loading && (
            <div className="notes-empty">No notes found.</div>
          )}
          <div className="notes-list">
            {notes.map((note) => (
              <NoteCard
                note={note}
                key={note.id}
                onEdit={() => onEditNote(note)}
                onDelete={() => onDeleteNote(note.id)}
              />
            ))}
          </div>
        </div>
        {modalOpen && (
          <NoteModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            mode={modalMode}
            note={selectedNote}
            onSave={onSaveNote}
          />
        )}
      </div>
    </NotesContext.Provider>
  );
}

export default NotesPage;
