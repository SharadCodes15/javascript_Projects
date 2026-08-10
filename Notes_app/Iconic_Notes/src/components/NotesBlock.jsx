import React from 'react';

const NotesBlock = ({ 
  category = "Project Alpha", 
  date = "Today", 
  title = "Q3 Marketing Strategy Overview", 
  text = "Key objectives for the upcoming quarter include expanding our reach in the European market, launching the new feature set...", 
  tag = "", 
  image = "", 
  pinned = false,
  color = "purple" // Supports dynamic accent colors: purple, green, blue
}) => {

  // Color mapping configuration for the category tag and top-left border accent
  const colorMap = {
    purple: { border: 'border-l-purple-600', text: 'text-purple-600 bg-purple-50' },
    green: { border: 'border-l-emerald-600', text: 'text-emerald-600 bg-emerald-50' },
    blue: { border: 'border-l-blue-600', text: 'text-blue-600 bg-blue-50' },
  };

  const selectedColor = colorMap[color] || colorMap.purple;

  return (
    <div className={`w-full bg-white border border-gray-100 border-l-4 ${selectedColor.border} rounded-r-xl rounded-l-sm p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-[260px] relative`}>
      
      {/* 1. Card Header Area */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${selectedColor.text}`}>
          {category}
        </span>
        <span className="text-xs text-gray-400 font-medium">
          {date}
        </span>
      </div>

      {/* 2. Main Body Content */}
      <div className="flex-1 flex flex-col justify-start overflow-hidden">
        <h3 className="font-bold text-base text-gray-900 leading-tight mb-2 tracking-tight">
          {title}
        </h3>
        
        {/* Conditional View: If the card has a cover image, render a split view */}
        {image ? (
          <div className="flex gap-3 items-start mt-1">
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
              {text}
            </p>
            <img 
              src={image} 
              alt={title} 
              className="w-20 h-16 object-cover rounded-lg border border-gray-100"
            />
          </div>
        ) : (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-5">
            {text}
          </p>
        )}
      </div>

      {/* 3. Footer Action Controls */}
      <div className="mt-4 flex items-center justify-between min-h-[24px]">
        {/* Render a custom label tag if passed down as a prop */}
        {tag ? (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-blue-50 text-blue-600">
            {tag}
          </span>
        ) : (
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          </div>
        )}

        {/* Pinned Pin Button Positioned on Bottom Right */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://w3.org" fill={pinned ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotesBlock;
