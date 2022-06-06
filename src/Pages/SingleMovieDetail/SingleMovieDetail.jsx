import React from 'react'
import './SingleMovieDetail.css'
import { useParams } from 'react-router-dom'


const SingleMovieDetail = () => {
    let { id } = useParams();

    console.log(id, 'iddddddd')
  return (
    <div className='movie_detail_container'>
      
    </div>
  )
}

export default SingleMovieDetail
