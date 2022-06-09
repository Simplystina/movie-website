import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, NavigationFooter } from '../../Components'
import './Home.css'
const Home = () => {

  
  return (
    <div className='home_container'>
       <Navbar/>/
       
       <Outlet/>
       <NavigationFooter/>
    </div>
  )
}

export default Home
