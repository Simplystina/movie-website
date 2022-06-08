import React, {useEffect, useRef} from 'react'
import './Movies.css'
import {BiMoviePlay} from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux';
import { getMovies, resetPageNumber, updateID } from '../../features/moviesSlice';
import { updatePageNumber } from '../../features/moviesSlice';
import { Genre, Loader, Pagination, SingleMovie } from '../../Components';

const genresList = [
    { genre: 'Action', id: 28 },
    { genre: 'Animation', id: 16 },
    { genre: 'Sci Fi', id: 878 },
    { genre: 'Comedy', id: 35 },
    { genre: 'Drama', id: 18 },
    { genre: 'Romance', id: 10749 },
    { genre: 'War', id: 10752 },
    { genre: 'Documentary', id: 99 },
    { genre: 'Horror', id: 27 },
    { genre: 'Family', id: 10751 },
    { genre: 'Crime', id: 80 },
    { genre: 'History', id: 36 },
    { genre: 'Mystery', id: 9648 },
]
const Movies = () => {

  const mainElement = useRef()

  const {isLoading, pageNumber,moviesList, movieId, pageCount} = useSelector((state) =>state.movies);
  const dispatch = useDispatch()
  
  
  useEffect(()=>{
      console.log(pageNumber,'recent pagenumber', movieId,'movieid')
    dispatch(getMovies({ movieId, pageNumber}))
    window.scrollTo(0, 0)
    
  },[pageNumber])

  

  if(isLoading){
      return(
    <div className='page_container'>
        <div className='page_heading' >
           <h2><BiMoviePlay className='page_icon'/>Popular Movies</h2>
           <p>Discover Popular Movies that you'd love</p>
        </div>
        <Loader/>
    </div>
       
      )
  }
  return (
    <div className='page_container'>
       <div className='page_heading' >
           <h2><BiMoviePlay className='page_icon'/>Popular Movies</h2>
           <p>Discover Popular Movies that you'd love</p>
        </div>
        <Genre genresList={genresList}
               movieId={movieId} 
               pageNumber={pageNumber}
               getData={getMovies}
               updateID={updateID}
               resetPageNumber={resetPageNumber}
               />
        <div className='movies_container' ref={mainElement}>
            {
                 moviesList.map((movie)=>{
                     return(
                         <SingleMovie
                          key={movie.id}
                          media_type='movie'
                           data={movie}
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

export default Movies
