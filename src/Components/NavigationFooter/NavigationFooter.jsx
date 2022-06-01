import React from 'react'
import './NavigationFooter.css'
import {AiTwotoneFire} from 'react-icons/ai'
import {BiMoviePlay, BiSlideshow, BiSearchAlt2} from 'react-icons/bi'
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import {NavLink} from 'react-router-dom'


const NavigationFooter = () => {
  return (
    <div className='navigation_footer_container'>
         <div className='navigation_footer'>
             <div className='navigation_footer_content'>
                 <span><AiTwotoneFire/></span>
                 <p>Trending</p>
             </div>
             <div className='navigation_footer_content'>
                 <span><BiMoviePlay/></span>
                 <p>Movies</p>
             </div>
             <div className='navigation_footer_content'>
                 <span><BiSlideshow/></span>
                 <p>Tv shows</p>
             </div>
             <div className='navigation_footer_content'>
                 <span><BiSearchAlt2/></span>
                 <p>Search</p>
             </div>
             <div className='navigation_footer_content'>
                 <span><BsFillBookmarkHeartFill/></span>
                 <p>Bookmark</p>
             </div>
         </div>
    </div>
  )
}

export default NavigationFooter
