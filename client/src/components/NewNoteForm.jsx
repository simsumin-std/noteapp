import React, { useState } from 'react';

const NewNoteForm = ({ noteService, onError, onCreated }) => {
  const [note, setNote] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    noteService
      .postNote(note)
      .then((created) => {
        setNote('');
        onCreated(created);
      })
      .catch(onError);
  };

  const onChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <form className='note-form' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Edit your note'
        value={note}
        required
        autoFocus
        onChange={onChange}
        className='form-input note-input'
      />
      <button type='submit' className='form-btn'>
        Done
      </button>
    </form>
  );
};

export default NewNoteForm;
