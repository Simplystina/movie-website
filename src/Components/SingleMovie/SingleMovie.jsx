import React from 'react'
import './SingleMovie.css'
import { noPoster, img_500 } from '../../config/config';
import {BsBookmarkHeart} from 'react-icons/bs'
import { Link, useLocation} from 'react-router-dom';

const SingleMovie = ({data, media_type}) => {
    
    const {poster_path, name, title, original_title, first_air_date, release_date ,id} = data
    const location = useLocation()
    const path = location.pathname
  return (
    <Link to={`${path}/${id}`}>
    <div key={id} className='single_movie_card'>
        <div className='movie_image_container'>
            <img className='movie_image' src={!poster_path ? noPoster : `${img_500}${poster_path}`} alt={name ||title}/>
            <span className='movie_icon_container'><BsBookmarkHeart className='movie_icon'/></span>
        </div>
        <div className='single_movie_content hide'>
            <h2>{ 
                    original_title?.length <20 || name?.length <20 ? original_title ||name 
                        : `${original_title?.substring(0,20)}...` || `${name?.substring(0,20)}...`
                    }
            </h2>
            <p>{media_type === 'tv'? 'TV Show' : media_type}</p>
            <p>{first_air_date || release_date}</p>
        </div>
    </div>
    </Link>
  )
}

export default SingleMovie
