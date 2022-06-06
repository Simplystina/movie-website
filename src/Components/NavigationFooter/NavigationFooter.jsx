import React from 'react'
import './NavigationFooter.css'
import {AiTwotoneFire} from 'react-icons/ai'
import {BiMoviePlay, BiSlideshow, BiSearchAlt2} from 'react-icons/bi'
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import {NavLink} from 'react-router-dom'
import { clearState } from '../../features/searchSlice'
import { useDispatch } from 'react-redux'

const NavigationFooter = () => {

    const dispatch = useDispatch()
    const clearSearch = ()=>{
        dispatch(clearSearch())
    }
  return (
    <div className='navigation_footer_container'>
         <div className='navigation_footer'>
             <div className='navigation_footer_content'>
                <NavLink className='nav_footer_links' to='/'>
                   <span><AiTwotoneFire/></span>
                   <p>Trending</p>
                </NavLink>
             </div>
            
             <div className='navigation_footer_content'>
                 <NavLink to='movies' className='nav_footer_links'>
                    <span><BiMoviePlay/></span>
                    <p>Movies</p>
                 </NavLink>
             </div>
             <div className='navigation_footer_content'>
                 <NavLink to='tvshows' className='nav_footer_links'>
                    <span><BiSlideshow/></span>
                    <p>Tv shows</p>
                 </NavLink>
             </div>
             <div className='navigation_footer_content'>
                 <NavLink to='search' onClick={clearSearch} className='nav_footer_links'>
                    <span><BiSearchAlt2/></span>
                    <p>Search</p>
                 </NavLink>
             </div>
             <div className='navigation_footer_content'>
                 <NavLink to='' className='nav_footer_links'>
                    <span><BsFillBookmarkHeartFill/></span>
                    <p>Bookmark</p>
                 </NavLink>
             </div>
         </div>
    </div>
  )
}

export default NavigationFooter
