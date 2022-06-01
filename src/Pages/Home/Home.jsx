import React from 'react'
import { Navbar, NavigationFooter } from '../../Components'
import Trending from '../Trending/Trending'
const Home = () => {
  return (
    <div>
       <Navbar/>
       <Trending/>
       <NavigationFooter/>
    </div>
  )
}

export default Home
