import React, { useState } from 'react';

const EditNoteForm = ({ note, onUpdate, onClose }) => {
  const [text, setText] = useState(note.text);

  const onSubmit = async (event) => {
    event.preventDefault();
    onUpdate(note.id, text);
    onClose();
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form className='edit-note-form' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Edit your note'
        value={text}
        required
        autoFocus
        onChange={onChange}
        className='form-input note-input'
      />
      <div className='edit-note-form-action'>
        <button type='submit' className='form-btn-update'>
          Update
        </button>
        <button type='button' className='form-btn-cancel' onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditNoteForm;
