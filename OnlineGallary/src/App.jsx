import React from 'react'
import { fetch_Imgs, fetch_Vids } from './api/mediaApi'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
        <SearchBar/>
        <Tabs/>
        <ResultGrid/>
      </div>
    </>
  )
}

export default App