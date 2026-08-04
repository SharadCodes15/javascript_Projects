import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import CreatePost from "./pages/CreatePost"
import Feed from './pages/Feed';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/Create-post' element={<CreatePost />} />
          <Route path='/Posts' element={<Feed/>} />

      </Routes>
    </Router>

  )
}

export default App