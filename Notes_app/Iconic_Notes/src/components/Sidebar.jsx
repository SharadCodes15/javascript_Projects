import{
    RiAddLine,
    RiArchiveLine,
    RiDeleteBin6Line,
    RiFileList2Line,
    RiStarLine,
    RiSettings3Line,
} from "@remixicon/react"

import React from 'react'

const Sidebar = () => {
    const menuitems = [
        {
            title:"All Notes",
            icon:RiFileList2Line,
            active:true,
        },
        {
            title:"Favorites",
            icon:RiStarLine,
        },
        {
            title:"Archive",
            icon:RiArchiveLine,
        },
        {
            title:"Trash",
            icon:RiDeleteBin6Line,
        }
    ]
  return (
    <>
        <aside className="w-63 h-screen bg-[#F6F8FF] border-r border-gray-200 flex flex-col px-5 py-8">
            <div className="logo">
                <h1 className="text-4xl font-bold text-indigo-700">Iconin Notes</h1>
                <p className="text-xs tracking-[3px] text-gray-500 uppercase mt-1">
                    Premium Notes
                </p>
            </div>

            <button className="mt-10 flex cursor-pointer items-center justify-center gap-3 h-14 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-medium shadow-lg transition" >
                <RiAddLine size={22}/>
                New Note
            </button>

            <nav className="mt-8 space-y-2">
                {menuitems.map((item,index)=>{
                    const Icon = item.icon;
                    return (
                        <button key={index}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition ${item.active ? "bg-gradient-to-r from-purple-400 to-purple-300 text-white shadow" : "text-gray-700 hover:bg-white"}`}
                        >

                        <Icon size={20}/>
                        <span className="font-medium">{item.title}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <button className="flex item-center gap-4 text-gray-700 hover:text-indigo-700 transition px-2 py-3">
                          <RiSettings3Line size={22} />
                        <span className="font-medium">Settings</span>
                </button>
            </div>
        </aside>


    </>
  )
}

export default Sidebar