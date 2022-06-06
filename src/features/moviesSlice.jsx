import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { customFetch } from '../utils/axios'

const initialState ={
    moviesList: [],
    isLoading:true,
    pageCount: 0,
    pageNumber:1,
    movieId:0

}
const api_key = process.env.REACT_APP_API_KEY

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    
    async({movieId,pageNumber}, thunkAPI )=>{
        console.log(movieId,pageNumber,'in api hereeeeee')
        try {
            const resp = await customFetch.get(
                movieId ===0? `/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}` : `/discover/movie?api_key=${api_key}&with_genres=${movieId}&page=${pageNumber}`
                )
            console.log(resp.data,'rapppppp')
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const moviesSlice = createSlice({
    name:'movies',
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
        [getMovies.pending]: (state)=>{
            state.isLoading = true
        },
        [getMovies.fulfilled]: (state, {payload})=>{
            state.isLoading = false
            state.moviesList = payload.results
            state.pageCount = payload.total_pages
           
        },
        [getMovies.rejected]: (state)=>{
            state.isLoading = false
        }
    }
    
    
})

export default moviesSlice.reducer
export const {updatePageNumber,updateID, resetPageNumber} = moviesSlice.actions
