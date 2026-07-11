import React from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../redux/features/collectionSlice'

const ResultCard = ({item}) => {

    const dispatch = useDispatch()

    const addToCollection = (item)=>{
        console.log('Dispatching addCollection with', item)
        
        dispatch(addCollection(item))
    }

   return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>
            <a target='_blank' rel='noreferrer' className='h-full' href={item.url || item.src}>
                {item.type === 'photo' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
                {item.type === 'video' ? <video className='h-full w-full object-cover object-center' autoPlay loop muted src={item.src}></video> : ''}
                {item.type === 'gif' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
            </a>
            <div id='bottom' className='absolute bottom-0 w-full px-4 py-4'>
                <div className='bg-gradient-to-t from-black/70 to-transparent p-3 rounded-t-md flex justify-between items-center text-white'>
                  <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item.title}</h2>
                  <button
                      onClick={() => addToCollection(item)}
                      className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'
                  >
                      Save
                  </button>
                </div>
            </div>
        </div>
    )
}

export default ResultCard