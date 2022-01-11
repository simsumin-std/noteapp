import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Banner from './Banner';
import NewNoteForm from './NewNoteForm';
import NoteCard from './NoteCard';
import { useAuth } from '../context/AuthContext';

const Notes = memo(({ noteService, username, addable }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    noteService
      .getNotes(username)
      .then((notes) => setNotes([...notes]))
      .catch(onError);
  }, [noteService, username, user]);

  const onCreated = (note) => {
    setNotes((notes) => [note, ...notes]);
  };

  const onDelete = (noteId) =>
    noteService
      .deleteNote(noteId)
      .then(() =>
        setNotes((notes) => notes.filter((note) => note.id !== noteId))
      )
      .catch((error) => setError(error.toString()));

  const onUpdate = (noteId, text) =>
    noteService
      .updateNote(noteId, text)
      .then((updated) =>
        setNotes((notes) =>
          notes.map((item) => (item.id === updated.id ? updated : item))
        )
      )
      .catch((error) => error.toString());

  const onUsernameClick = (note) => history.push(`/${note.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <>
      {addable && (
        <NewNoteForm
          noteService={noteService}
          onError={onError}
          onCreated={onCreated}
        />
      )}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {notes.length === 0 && <p className='notes-empty'>No Notes Yet</p>}
      <ul className='notes'>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            owner={note.username === user.username}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
});
export default Notes;
