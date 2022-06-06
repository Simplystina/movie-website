import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { customFetch } from '../utils/axios'

const initialState ={
    tvshowsList: [],
    isLoading:true,
    pageNumber:1,
    movieId:0,
    pageCount:0,

}
const api_key = process.env.REACT_APP_API_KEY

export const getTvShows = createAsyncThunk(
    'tvshows/getTvShows',
    
    async({movieId,pageNumber}, thunkAPI )=>{
        console.log(movieId,pageNumber,'in api hereeeeee')
        try {
            const resp = await customFetch.get(
                movieId ===0? `/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}` 
                : `/discover/tv?api_key=${api_key}&with_genres=${movieId}&page=${pageNumber}`)
            console.log(resp.data,'tvshowwwss')
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const tvshowsSlice = createSlice({
    name:'tvshows',
    initialState,
    reducers:{
        updatePageNumber: (state,action)=>{
            
            return {
                ...state,
                pageNumber :action.payload,
            }
            
        },
        updateID:(state, action)=>{
            return {
                ...state,
                movieId :action.payload,
            }
        },
        resetPageNumber:(state)=>{
            return{
                ...state,
                pageNumber:1
            }
        }
        
    },
    extraReducers:{
        [getTvShows.pending]: (state)=>{
            state.isLoading = true
        },
        [getTvShows.fulfilled]: (state, {payload})=>{
            state.isLoading = false
            state.tvshowsList = payload.results
            state.pageCount = payload.total_pages
           
        },
        [getTvShows.rejected]: (state)=>{
            state.isLoading = false
        }
    }
    
    
})

export default tvshowsSlice.reducer
export const {updatePageNumber,updateID,resetPageNumber} = tvshowsSlice.actions
