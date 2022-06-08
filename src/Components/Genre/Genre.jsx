import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
//import { getMovies, updateID } from '../../features/moviesSlice';
import './Genre.css'


const Genre = ({genresList, movieId, pageNumber, getData, updateID, resetPageNumber}) => {
    const dispatch = useDispatch()

    const getGenreId = (e)=>{
        let id = e.currentTarget.id
        
        console.log(id,'idddddddd')
        dispatch(updateID(id))
        dispatch(getData({movieId:id,pageNumber}))
        dispatch(resetPageNumber())
    }

  return (
    <div className='genres_container'>
            {
                genresList.map((item)=>{
                    return (
                        <span key={item.id} onClick={getGenreId} className={movieId==item.id? 'genre active': 'genre not_active'} id={item.id}>{item.genre}</span>
                    )
                })
            }

        </div>
  )
}

export default Genre
