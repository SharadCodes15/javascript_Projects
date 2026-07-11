import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CollectionCard } from '../components/CollectionCard'
import { clearCollection } from '../redux/features/collectionSlice'

const CollectionPage = () => {
    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection.items)

    return (
        <main className='px-8 py-8'>
            <div className='max-w-4xl mx-auto text-white mb-6'>
                <h1 className='-3xl font-bold'>Your Collection</h1>
                <p className='text-slate-300 mt-1'>Saved items are stored in your browser's localStorage.</p>
            </div>

            {collection.length === 0 ? (
                <div className='text-center text-white py-20'>
                    <h2 className='text-2xl font-semibold'>No items saved yet</h2>
                    <p className='text-slate-300 mt-2'>Save images or videos from search results to build your collection.</p>
                </div>
            ) : (
                <div>
                    <div className='flex justify-end mb-4'>
                        <button
                            onClick={() => dispatch(clearCollection())}
                            className='bg-red-600 text-white px-4 py-2 rounded'
                        >
                            Clear All
                        </button>
                    </div>

                    <div className='flex justify-start w-full flex-wrap gap-4 overflow-auto px-2'>
                        {collection.map((item, idx) => (
                            <div key={idx}>
                                <CollectionCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    )
}

export default CollectionPage