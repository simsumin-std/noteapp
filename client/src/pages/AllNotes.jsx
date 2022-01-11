import React from 'react';
import Notes from '../components/Notes';

const AllNotes = ({ noteService }) => (
  <Notes noteService={noteService} addable={true} />
);

export default AllNotes;
