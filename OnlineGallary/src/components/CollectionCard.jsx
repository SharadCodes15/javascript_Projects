import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection } from '../redux/features/collectionSlice'

export const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()
    const removeFromCollection = (itemId)=>{
        dispatch(removeCollection(itemId))
    }
  return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>
            <a target='_blank' rel='noreferrer' className='h-full' href={item.url || item.src}>
                {item?.type === 'photo' ? <img className='h-full w-full object-cover object-center' src={item.src} alt={item.title || ''} /> : null}
                {item?.type === 'video' ? <video className='h-full w-full object-cover object-center' autoPlay loop muted src={item.src}></video> : null}
                {item?.type === 'gif' ? <img className='h-full w-full object-cover object-center' src={item.src} alt={item.title || ''} /> : null}
            </a>
                        <div id='bottom' className='absolute bottom-0 w-full px-4 py-4'>
                                <div className='bg-gradient-to-t from-black/70 to-transparent p-3 rounded-t-md flex justify-between items-center text-white'>
                                    <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item?.title}</h2>
                                    <button
                                        onClick={() => removeFromCollection(item.id)}
                                        className='bg-red-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'
                                    >
                                        Remove
                                    </button>
                                </div>
                        </div>
        </div>
    )
}
