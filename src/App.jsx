import { useState } from 'react';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';

import Applayout from './Components/Layout/Applayout';
import Home from './Pages/Home';


import './App.css';

function App() {
    const router = createBrowserRouter([
    {
      path : "/",
      element : <Applayout/>,
      children : [{
     
      path : "/", 
      element : <Home/>,
    },
    
    

    ]
    },
    
  ]);

  return (
    <>
      
       <RouterProvider router={router} />
      
    </>
  )
}

export default App