import React from 'react'
import movieIcon from '../../images/default-monochrome.svg'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-image-container'>
            <img src={movieIcon} alt="movie-icon"/>
        </div>
    </div>
  )
}

export default Navbar
