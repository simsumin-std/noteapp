import React, { memo, useState } from 'react';
import parseDate from '../util/date';
import Avatar from './Avatar';
import EditNoteForm from './EditNoteForm';

const NoteCard = memo(
  ({ note, owner, onDelete, onUpdate, onUsernameClick }) => {
    const { id, username, name, url, text, createdAt } = note;
    const [editing, setEditing] = useState(false);
    const onClose = () => setEditing(false);

    return (
      <li className='note'>
        <section className='note-container'>
          <Avatar url={url} name={name} />
          <div className='note-body'>
            <span className='note-name'>{name}</span>
            <span
              className='note-username'
              onClick={() => onUsernameClick(note)}
            >
              @{username}
            </span>
            <span className='note-date'> · {parseDate(createdAt)}</span>
            <p>{text}</p>
            {editing && (
              <EditNoteForm
                note={note}
                onUpdate={onUpdate}
                onClose={onClose}
              />
            )}
          </div>
        </section>
        {owner && (
          <div className='note-action'>
            <button className='note-action-btn' onClick={() => onDelete(id)}>
              x
            </button>
            <button
              className='note-action-btn'
              onClick={() => setEditing(true)}
            >
              ✎
            </button>
          </div>
        )}
      </li>
    );
  }
);
export default NoteCard;
