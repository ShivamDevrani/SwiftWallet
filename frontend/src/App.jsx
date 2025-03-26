import React, { lazy } from 'react'
import './App.css'

import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'

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
      <Route path='/' element={<IndexPage/>}/>
      <Route path='/signup' index element={<Signup ></Signup>}/>
      <Route path='/signin' element={ <Signin></Signin>}/>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
      <Route path='/send' element={<Send></Send>}/>
      
      </Routes>

       </BrowserRouter>
    </div>
  )
}


function IndexPage(){
  const navigate=useNavigate();
  return  <div>
     <button  className='border  bg-red-400  rounded  pl-2 pr-2 pt-0.5 pb-0.5' onClick={()=>{
      navigate('/signin');
    }}>
      Sign in
    </button>
   
  </div>
    

}

export default App
