//NotesContext.js
import React, { createContext, useState } from 'react';
import { NOTES, TRASH } from '../../data/dummy-data';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(NOTES);
  const [trashNotes, setTrashNotes] = useState(TRASH);

  const restoreNote = (noteId) => {
    const note = trashNotes.find(n => n.id === noteId);
    if (note) {
      setNotes(prevNotes => [...prevNotes, note]);
      setTrashNotes(prevTrash => prevTrash.filter(n => n.id !== noteId));
    }
  };

  const deleteNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setTrashNotes(prevTrash => [...prevTrash, note]);
      setNotes(prevNotes => prevNotes.filter(n => n.id !== noteId));
    }
  };

  const restoreAllNotes = () => {
    setNotes(prevNotes => [...prevNotes, ...trashNotes]);
    setTrashNotes([]);
  };

  const emptyTrash = () => {
    setTrashNotes([]);
  };

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <NotesContext.Provider value={{ notes, trashNotes, restoreNote, deleteNote, restoreAllNotes, emptyTrash, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
