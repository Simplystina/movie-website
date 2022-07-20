import React, { useEffect, useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSearch, updateSearchWord, clearState ,updatePageNumber} from '../../features/searchSlice'
import { Loader, Pagination, SingleMovie } from '../../Components'
import { useLocation} from 'react-router-dom'

const Search = () => {

    const dispatch = useDispatch()
    const {isLoading, searchWord, searchResults, errorMessage, pageCount, pageNumber} = useSelector((state)=>(state.search))
    const [value, setValue] = useState()

   

    const handleChange = (e)=>{
        setValue(e.target.value)
        dispatch(updateSearchWord(e.target.value))
    }

    const clearBtn = ()=>{
        setValue('')
       dispatch(clearState())
    }

    
    useEffect(()=>{
        if(searchWord.trim() !== ''){
            dispatch(getSearch({ value:searchWord, pageNumber}))
        }
    },[searchWord, pageNumber])


    
  return (
    <div className='page_container'>
       <div className='page_heading' >
           <h2><BiSearchAlt2 className='page_icon'/>Search</h2>
           <p>Find movies and TV shows from all over the world</p>
        </div>
        <div className='search_container'>
            <input 
              type='text' 
              className='search_input'
              onChange={handleChange}
              value={value}
              placeholder='Search for a movie or TV show...'/>
            <span onClick={clearBtn} className='search_clear_btn'>clear</span>
        </div>
        {isLoading && <Loader/>}
        <p className='error-alert'>{errorMessage}</p>
        <div className='movies_container'>
           
            {
                searchResults.map((movie)=>{
                   return <SingleMovie
                           key={movie.id}
                           data={movie}
                           media_type={movie.media_type}
                         />
                })
            }
        </div> 
       {searchResults.length !== 0 && 
       <Pagination 
            updatePageNumber={updatePageNumber} 
            pageNumber={pageNumber}
            pageCount={pageCount >17? 17: pageCount}
            
            />}
    </div>
  )
}

export default Search
