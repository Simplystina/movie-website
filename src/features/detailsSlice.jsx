import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { customFetch } from '../utils/axios'

const initialState ={
    detailsList: [],
    isLoading:true,
    pageCount: 0,
    pageNumber:1,
    

}
const api_key = process.env.REACT_APP_API_KEY

export const getDetails = createAsyncThunk(
    'details/getDetails',
    
    async({type,id}, thunkAPI )=>{
       // console.log(movieId,pageNumber,'in api hereeeeee')
        try {
            const resp = await customFetch.get(
               `/${type}/${id}?api_key=${api_key}&language=en-US&append_to_response=videos,credits,similar`
                )
            console.log(resp.data,'Detailsssssssss')
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const detailsSlice = createSlice({
    name:'details',
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
        [getDetails.pending]: (state)=>{
            state.isLoading = true
        },

        [getDetails.fulfilled]: (state, {payload})=>{
            state.isLoading = false
            state.detailsList = payload
        },

        [getDetails.rejected]: (state)=>{
            state.isLoading = false
        }
    }
    
    
})

export default detailsSlice.reducer
export const {updatePageNumber,updateID, resetPageNumber} = detailsSlice.actions
