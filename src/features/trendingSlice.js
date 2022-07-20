import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { customFetch } from '../utils/axios'

const initialState ={
    trendingList: [],
    isLoading:true,
    perPage:20,
    pageCount: 0,
    pageNumber:1,

}
const api_key = process.env.REACT_APP_API_KEY

export const getTrending = createAsyncThunk(
    'movies/getTrending',
    
    async( pageNumber, thunkAPI )=>{
        try {
            const resp = await customFetch.get(`/trending/all/day?api_key=${api_key}&page=${pageNumber}`)
            //console.log(resp.data, pageNumber)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const trendingSlice = createSlice({
    name:'trending',
    initialState,
    reducers:{
        updatePageNumber: (state,action)=>{
            
            return {
                ...state,
                pageNumber :action.payload,
            }  
        } 
    },
    extraReducers:{
        [getTrending.pending]: (state)=>{
            state.isLoading = true
        },
        [getTrending.fulfilled]: (state, {payload})=>{
            state.isLoading = false
            state.trendingList = payload.results
            state.pageCount = payload.total_pages
        },
        [getTrending.rejected]: (state)=>{
            state.isLoading = false
        }
    }
    
})
export default trendingSlice.reducer
export const {updatePageNumber} = trendingSlice.actions
