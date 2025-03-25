import { useNavigate, useSearchParams } from 'react-router-dom'
import { CustomInput } from './CustomInput'
import {useState } from 'react';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'

export default function Send() {

     const [searchParams]=useSearchParams();

     const id=searchParams.get('id');
     const name=searchParams.get('name');
     
     const [money,setMoney]=useState('10000');

     const navigate=useNavigate();

    
    return <div className="h-screen flex justify-center items-center">
        <div className="border border-gray-400 p-4 rounded-xl shadow-2xs shadow-slate-700 w-[28rem]">
            <div className="font-bold text-3xl text-center mt-5">
                Send Money
            </div>  
            <div className="mt-9 flex flex-col gap-3">
                <div className="flex  items-center gap-5 p-3">
                    <div className="h-9 w-9 rounded-full bg-green-500 text-white  flex justify-center items-center p-4">
                        {name[0].toUpperCase()}
                    </div>
                    <div className="font-medium text-xl">
                        {name.toUpperCase()}
                    </div>
                </div>
                <div className="font-medium text-slate-700">Amount(in Rs)</div>
                <CustomInput onchange={(e)=>{
                      setMoney(e.target.value);
                }}  label={""} placeholder={"10,000"}></CustomInput>
                <div className='text-center'>
                    <button onClick={async()=>{
                       const toastId=toast.loading("Processing... ⏳");
                       try{
              
                        const dataToBeSend={
                          to:id,
                          amount:money
                         }
                         
                         const res=await axios.post('https://swiftwallet-uq9a.onrender.com/account/transfer',dataToBeSend,{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem('token')}`
                            }
                         });
              
                         console.log(res.data);
                          toast.update(toastId,{
                            type:"success",
                            render:res.data.message,
                            isLoading:false,
                            autoClose:1000
                          });

                            await new Promise((res)=>setTimeout(res,1000));
              
                            navigate('/dashboard');
                
                       }
                       catch(err)
                       {
                          console.log(err);
                          toast.update(toastId,{
                            type:"error",
                            render: err.response?.data?.message || "Something Went Wrong ❌",
                            isLoading:false,
                            autoClose:3000
                          })
                       }

                    }} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send Money</button>
                </div>
            </div>
           <ToastContainer></ToastContainer>
        </div>
    </div>
}