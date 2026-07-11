import React, { useState } from 'react'
import { fetch_Imgs, fetch_Vids } from '../api/mediaApi'
import { useDispatch } from 'react-redux'
import { store } from '../redux/store'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {

  const [text, settext] = useState('')
  const dispatch = useDispatch()

  const submithandler = (e) =>{
    e.preventDefault()
    dispatch(setQuery(text))
    console.log(text)
    settext('')
  }

  return (
    <>
      <form onSubmit={submithandler} className='flex gap-2 p-4 justify-center'>
        <input
          value={text}
          onChange={(e) => settext(e.target.value)}
          className='text-slate-900 border text-white border-slate-300 px-4 py-3 text-lg rounded-l-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-96 transition'
          type='text'
          aria-label='Search'
          placeholder='Search images, videos or GIFs...'
        />
        <button className='px-6 py-3 text-lg rounded-r-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition'>
          Search
        </button>
      </form>
    </>
  )
}

export default SearchBar