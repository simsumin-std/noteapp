import React from 'react';
import { useParams } from 'react-router-dom';
import Notes from '../components/Notes';

const MyNotes = ({ noteService }) => {
  const { username } = useParams();
  return (
    <Notes noteService={noteService} username={username} addable={false} />
  );
};

export default MyNotes;
