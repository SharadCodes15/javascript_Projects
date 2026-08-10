import React from "react";
import {
  RiSearchLine,
  RiNotificationLine,
  RiMoonLine,
  RiUserLine,
} from "@remixicon/react";

const Navbar = () => {
  return (
    <nav className="h-[84px] w-full border-b border-[#e5e7f0] bg-[#f8f9ff]">
      <div className="flex h-full items-center justify-between px-10">
        
        {/* Search */}
        <div className="flex nav-search h-10 w-[480px] items-center gap-3 rounded-full bg-[#eef1ff] px-4">
          <RiSearchLine
            size={22}
            className="text-[#667085]"
          />

          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-transparent text-sm text-[#344054] outline-none placeholder:text-[#667085]"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex navbar-button items-center gap-7">
          
          {/* Notification */}
          <button className="text-[#292b3a] transition hover:text-[#3425c9]">
            <RiNotificationLine size={22} />
          </button>

          {/* Dark mode */}
          <button className="text-[#292b3a] transition hover:text-[#3425c9]">
            <RiMoonLine size={22} />
          </button>

          {/* Profile */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe3ec] bg-white">
            <RiUserLine
              size={20}
              className="text-[#292b3a]"
            />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;