import React from 'react'
import {AiTwotoneFire} from 'react-icons/ai'
import './Trending.css'

const Trending = () => {
  return (
    <div className='trending_container'>
        <div className='trending_heading'>
           <h2><AiTwotoneFire className='trending_icon'/>Trending</h2>
           <p>These are the most popular movies and TV shows this week</p>
        </div>
           
    </div>
  )
}

export default Trending
