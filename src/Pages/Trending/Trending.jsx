import React, { useEffect } from 'react'
import {AiTwotoneFire} from 'react-icons/ai'
import './Trending.css'
import { useSelector, useDispatch } from 'react-redux';
import { getTrending } from '../../features/trendingSlice';
import { Loader, Pagination, SingleMovie } from '../../Components';
import { updatePageNumber } from '../../features/trendingSlice';


const Trending = () => {

  const {isLoading,pageNumber,trendingList, pageCount} = useSelector((state) =>state.trending);
  const dispatch = useDispatch()
  
  
  useEffect(()=>{
    dispatch(getTrending(pageNumber))
    window.scrollTo(0, 0)
  },[pageNumber])
 
  if(isLoading){

    return <>
       <div className='page_container'>
        <div className='page_heading' >
           <h2><AiTwotoneFire className='page_icon'/>Trending</h2>
           <p>These are the most popular movies and TV shows this week</p>
        </div>
           <Loader/>
    </div>
       
    </>
    
   
  }
  return (
    <div className='page_container'>
        <div className='page_heading' >
           <h2><AiTwotoneFire className='page_icon'/>Trending</h2>
           <p>These are the most popular movies and TV shows this week</p>
        </div>
          <div className='movies_container'>
            {
              trendingList.map((movie)=>{
                 return (
                   <SingleMovie
                      media_type={movie.media_type}
                      data ={movie}
                   
                   />
                 )
              })
            }
          </div>
          <Pagination 
              updatePageNumber={updatePageNumber} 
              pageNumber={pageNumber}
              pageCount={pageCount >17? 17: pageCount}
              />
    </div>
  )
}

export default Trending
