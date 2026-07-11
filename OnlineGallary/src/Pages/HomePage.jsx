import React from 'react'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const {query} = useSelector((store) => store.search);

  return (
    <main className='px-8'>
      <div className='max-w-3xl mx-auto text-center py-8 text-white'>
        <h1 className='text-4xl font-bold mb-2'>Find stunning photos, videos and GIFs</h1>
        <p className='text-slate-300 mb-6'>Type a keyword and press Search to explore media from multiple providers.</p>
        <SearchBar />
      </div>

      {query !== '' ? (
        <section className='px-6'>
          <Tabs />
          <ResultGrid />
        </section>
      ) : (
        <div className='text-center text-white text-2xl rounded-lg py-20'>
          <h2>Search Something...</h2>
          <p className='text-slate-300 mt-2'>Try: nature, city, cats, cars</p>
        </div>
      )}
    </main>
  )
}

export default HomePage