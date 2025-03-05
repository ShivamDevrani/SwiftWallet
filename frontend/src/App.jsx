import React, { lazy } from 'react'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { useState } from 'react'

const Signup=lazy(()=>import('./component/Signup'))

const Signin=lazy(()=>import('./component/Signin'))

const Dashboard=lazy(()=>import('./component/Dashboard'))

const Send=lazy(()=>import('./component/Send'))



function App() {

  return (
    <div className="">
      <BrowserRouter>

      <Routes>
    
      <Route path='/signup' element={<Signup ></Signup>}/>
      <Route path='/signin' element={ <Signin></Signin>}/>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
      <Route path='/send' element={<Send></Send>}/>
      
      </Routes>

       </BrowserRouter>
    </div>
  )
}

export default App
