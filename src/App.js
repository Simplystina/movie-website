import React  from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import {Home} from './Pages/index'


function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route exact={true} path='/' element={<Home/>}></Route>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
