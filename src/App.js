import React  from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import {Home,Trending, Movies, TvShows, Search, SingleMovieDetail} from './Pages/index'


function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route exact={true} path='/' element={<Home/>}>
             <Route  index path='/' element={<Trending/>}/>
             <Route  index path='movies' element={<Movies/>}/>
             <Route  index path='tvshows' element={<TvShows/>}/>
             <Route  index path='search' element={<Search/>}/>
             <Route path=':pathname/:id' element={<SingleMovieDetail/>}/>
          </Route>
          
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
