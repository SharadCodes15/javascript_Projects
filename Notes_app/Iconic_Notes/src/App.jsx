import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[300px]">
        <Sidebar />
      </aside>

      {/* Main area */}
      <div className="ml-[300px]">
        
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="p-10">
          <h1 className="text-4xl font-semibold text-[#101828]">
            Notes
          </h1>

          {/* Your notes/cards will go here */}
        </main>

      </div>
    </div>
  );
};

export default App;