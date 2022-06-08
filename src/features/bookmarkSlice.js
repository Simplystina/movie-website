import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    bookmarkList:  JSON.parse(localStorage.getItem('Bookmarks')) || [],
    isLoading:true,
    pageCount: 0,
    pageNumber:1,
    idList : JSON.parse(localStorage.getItem('BookmarksID')) || []
}

const bookmarkSlice = createSlice({
    name:'bookmark',
    initialState,
    reducers:{
        updateBookmarkList: (state, action)=>{
            return{
                ...state,
                bookmarkList : [...state.bookmarkList, action.payload]
            }
        },
        getBookmarkList:(state,action)=>{
            return{
                ...state,
                bookmarkList : action.payload

              }
        },
        updateIDList:(state,action)=>{
            return{
                ...state,
                idList : [...state.idList,action.payload]
            }
        }, 
        getIDList: (state,action)=>{
            return{
                ...state,
                idList : action.payload
            }
        },
        removeFromList: (state,action)=>{
            return{
                ...state,
                bookmarkList : state.bookmarkList.filter((item)=>{
                    return item.id !== action.payload
                })
            }
        },
        removeID: (state,action)=>{
            return {
                ...state,
                idList: state.idList.filter((item)=>{
                    return item !== action.payload
                })
            }
        }
    }
})

export default bookmarkSlice.reducer
export const {  updateBookmarkList,
                getBookmarkList,
                updateIDList,
                getIDList,
                removeFromList,
                removeID } = bookmarkSlice.actions