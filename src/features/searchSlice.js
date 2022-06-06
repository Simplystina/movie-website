import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { customFetch } from '../utils/axios'

const initialState ={
    searchResults: [],
    isLoading:false,
    pageNumber:1,
    searchWord:'',
    errorMessage:'',
    pageCount:0

}

const api_key = process.env.REACT_APP_API_KEY

export const getSearch = createAsyncThunk(
    'search/getSearch',
    
    async( {value,pageNumber}, thunkAPI )=>{
        try {
            console.log(value, 'value')
            const resp = await customFetch.get(`/search/multi?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${value}&page=${pageNumber}`)
            console.log(resp.data)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        updateSearchWord: (state,action)=>{
            
            return {
                ...state,
                searchWord:action.payload,
            }
            
        },
        clearState:(state)=>initialState,

        updatePageNumber: (state,action)=>{
            
            return {
                ...state,
                pageNumber :action.payload,
            }
            
        }
            
        
        
    },
    extraReducers:{
        [getSearch.pending]: (state)=>{
            state.isLoading = true
            state.errorMessage = ''
        },
        [getSearch.fulfilled]: (state, {payload})=>{
            state.isLoading = false
            state.searchResults = payload.results
            state.pageCount = payload.total_pages
            if(payload.results.length===0){
                state.errorMessage ='Sorry no content match your search'
            }else{
                state.errorMessage =''
            }
           
        },
        [getSearch.rejected]: (state)=>{
            state.isLoading = false
            state.errorMessage ='Sorry no content match your search'
        }
    }
    
})
export default searchSlice.reducer
export const {updateSearchWord, clearState, updatePageNumber} = searchSlice.actions

