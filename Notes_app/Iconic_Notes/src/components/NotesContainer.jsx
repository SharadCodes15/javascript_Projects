import React, { useEffect, useState } from 'react';
import NotesBlock from './NotesBlock';
import axios from 'axios';

const Notes_Container = () => {
  // Mock data mimicking the exact items from your UI reference image
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/notes/Notes')
      .then((res) => {
        setNotesData(res.data.notes);
        console.log(res);
      })
      .catch((err) => {
        console.log('Error fetching notes:', err);
      });
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row w-full mb-6 justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <button className="border border-gray-200 bg-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            Sort by: Last Updated
          </button>
        </div>
        {/*  */}
        
        {/* Standard responsive 3-column layout matching your workspace blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {notesData.map((note, index) => (
            <NotesBlock key={index} {...note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes_Container;
