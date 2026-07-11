import React from 'react'
import { fetch_Imgs, fetch_Vids } from './api/mediaApi'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import Navbar from './components/Navbar'
import ResultGrid from './components/ResultGrid'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CollectionPage from './Pages/CollectionPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Collection' element={<CollectionPage/>}/>
      </Routes>
            <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
      </div>
    </>
  )
}

export default App