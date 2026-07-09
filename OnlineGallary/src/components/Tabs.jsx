import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivetabs } from '../redux/features/searchSlice'

const Tabs = () => {
    const tabs = ['Photos','Videos','GIF']
    const dispatch = useDispatch()
    const activeTab = useSelector((state)=>state.search.activeTab)
  return (
    <>
        <div className='flex gap-2 px-10 pb-6'>
        {tabs.map(function(elem,idx){
            return <button onClick={()=>{dispatch(setActivetabs(elem))}}
             className={ `${activeTab==elem?'bg-blue-600 text-white':'bg-gray-600 text-gray-100'} px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer`}
              key={idx}>{elem}</button>
        })}
        </div>
    </>
  )
}

export default Tabs