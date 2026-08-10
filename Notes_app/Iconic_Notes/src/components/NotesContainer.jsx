import React from 'react';
import NotesBlock from './NotesBlock';

const Notes_Container = () => {
  // Mock data mimicking the exact items from your UI reference image
  const notesData = [
    {
      category: "Project Alpha",
      date: "Today",
      title: "Q3 Marketing Strategy Overview",
      text: "Key objectives for the upcoming quarter include expanding our reach in the European market, launching the new feature set, and scaling our core operations.",
      color: "purple"
    },
    {
      category: "Personal",
      date: "Yesterday",
      title: "Reading List & Thoughts",
      text: "Finished 'Thinking, Fast and Slow'. Fascinating insights on cognitive biases. Next up: 'Deep Work' by Cal Newport. Need to block out specific times in the morning for focused sessions.",
      color: "green",
      pinned: true
    },
    {
      category: "Ideas",
      date: "Oct 12",
      title: "App Redesign Concepts",
      text: "Focusing heavily on glassmorphism and ambient depth. We need to reduce cognitive load by embracing more whitespace. The typography hierarchy feels a bit muddy right now.",
      color: "blue"
    },
    {
      category: "Project Alpha",
      date: "Oct 10",
      title: "Meeting Notes: Kickoff",
      text: "Action items: Sarah to finalize the design system tokens. John to setup the staging environment. Review the API documentation by end of week.",
      tag: "Action Required",
      color: "purple"
    },
    {
      category: "Inspiration",
      date: "Oct 08",
      title: "Workspace Setup Ideas",
      text: "Looking to upgrade the secondary monitor setup. Adding warm ambient desk lighting strips and a minimalist wooden monitor riser could improve workflow layout efficiency.",
      image: "https://unsplash.com", // Placeholder computer workspace image
      color: "green"
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row w-full mb-6 justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <button className="border border-gray-200 bg-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            Sort by: Last Updated
          </button>
        </div>
        
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
