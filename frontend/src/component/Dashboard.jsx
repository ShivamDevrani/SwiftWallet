import { useEffect, useState } from 'react'
import {AppBar} from './AppBar'
import {Balance} from './Balance'
import {Users} from './Users'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'

import {Link} from 'react-router-dom'

export default function Dashboard()
{
    const [isAccess,setIsAccess]=useState(false);
    
    const [balance,setBalance]=useState(10000);


    useEffect(()=>{
        console.log('hiii');
      axios.get('http://localhost:3000/account/balance',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{
          setBalance(res.data.balance);
          setIsAccess(true);
      })
      .catch((err)=>{
         console.log(err.response.data.message);
         toast.error(err.response.data.message);
      })
    },[])

    return <div className='flex items-center justify-center mt-8'>
       {!isAccess? <div>Unauthorised Access <Link className=' ml-2 underline text-blue-500' to={'/signin'} >Go to Signin</Link></div>:
        <div className='w-[90rem]'>
        <AppBar></AppBar>
       <Balance balance={balance}></Balance>
       <Users></Users>
 
        </div>
       
       }
       <ToastContainer></ToastContainer>
    </div>
}