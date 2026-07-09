// search tab and result of search

import {createSlice} from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name:"search",
    initialState:{
        query:'',
        activeTab:'Photos',
        results:[],
        loading:false,
        error:null
    },
    reducers:{
        setQuery(state,action){
            state.query = action.payload
        },
        setActivetabs(state,action){
            state.activeTab = action.payload

        },
        setLoading(state,action){
            state.loading = true
            state.error = null
        },
        setResults(state,action){

            state.results = action.payload
            state.loading = false
        },
        setError(state,action){
            state.error = action.payload
            state.loading = false
        },
        clearResult(state){
            state.results = []
        }
    }

})

export const {setQuery
    ,setActivetabs,clearResult,setResults,setError,setLoading
} = searchSlice.actions

export default searchSlice.reducer;