import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const getInitialItems = () => {
    try {
        const raw = localStorage.getItem('Collection');
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.warn('Failed to parse Collection from localStorage:', err);
        return [];
    }
}

const initialState = {
    items: getInitialItems()
}

const collectionSlice = createSlice({
    name:'collection',
    initialState,
    reducers:{
        addCollection:(state,action)=>{
            console.log('addCollection reducer called with payload:', action.payload)
            if(!action.payload){
                console.warn('addCollection called with empty payload')
                return
            }
            const payloadId = action.payload.id
            if(payloadId === undefined || payloadId === null){
                console.warn('addCollection payload has no id:', action.payload)
                return
            }
            const alreadyExists = state.items.find(
                item => item.id == payloadId
            )
            console.log('existing items count:', state.items.length, 'alreadyExists:', !!alreadyExists)
            if(!alreadyExists){
                state.items.push(action.payload);
                try{
                    const plain = JSON.parse(JSON.stringify(state.items))
                    const serialized = JSON.stringify(plain)
                    localStorage.setItem('Collection', serialized)
                    console.log('Collection saved to localStorage, bytes:', serialized.length, plain)
                    toast.success("Added to collection!");
                }catch(err){
                    console.error('Failed to save Collection to localStorage', err)
                }
            }else{
                console.log(
                    'not working'
                );
                
            }   
        },
        removeCollection:(state,action)=>{
            state.items = state.items.filter(
                item => item.id != action.payload
            )
            try{
                const plain = JSON.parse(JSON.stringify(state.items))
                const serialized = JSON.stringify(plain)
                localStorage.setItem('Collection', serialized)
                console.log('Collection item removed from localStorage, bytes:', serialized.length, plain)
                toast.info("Removed from collection.");
            }catch(err){
                console.error('Failed to save Collection to localStorage', err)
            }

        },
        clearCollection:(state)=>{
            state.items = []
            localStorage.removeItem('Collection')
            toast.info("Full collection is cleared.");
        }

    }
})
export const{
    addCollection,
    removeCollection,
    clearCollection
} = collectionSlice.actions;

export default collectionSlice.reducer