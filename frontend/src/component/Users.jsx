import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'

export function Users()
{
   const [users,setUser]=useState([]);

    let a;

   const navigate=useNavigate();

   return <div className="p-3">
     <div className="font-bold text-slate-800">Users</div>
     <input onChange={(e)=>{
        clearInterval(a);
        a=setTimeout(async()=>{
        try{
          console.log('yes')
          if(e.target.value == ""){
            setUser([]);
            return;
          }
         const res= await axios.get(`http://localhost:3000/user/bulk?filter=${e.target.value}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
         });
         console.log(res.data.users);
         setUser(res.data.users);
        }
        catch(err)
        {
          console.log(err);
          toast.error(err.response?.data?.message || "Something Went Wrong ❌");
        }

        },400)
           
     }} type="text" className="rounded w-full border-gray-400 border px-2 py-0.5 mt-1" placeholder="Search users..." />

     {users.length==0?<div className="ml-2 mt-2 text-slate-500">No Results found</div>: 
     
     users.map((user,index)=>{
      return <div key={index} className="m-1 p-2 flex gap-1 items-center">

      <div className="w-8 h-8 rounded-full bg-gray-300 font-semibold flex justify-center items-center ">
          {user.firstName[0].toUpperCase()}
      </div>
      <div>
          {user.firstName.toUpperCase()}
      </div>
      <div>
         {user.lastName.toUpperCase()}
      </div>
      
      <div className= "mt-4 flex justify-end w-full p-1">
     <button type="button" onClick={()=>{

      navigate(`/send?id=${user._id}&name=${user.firstName +" "+ user.lastName}`);
      
     }} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send ₹</button>
     </div>
   </div>
   })
     }

   </div>
}

