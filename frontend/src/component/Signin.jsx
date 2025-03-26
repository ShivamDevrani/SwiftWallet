import { useState } from "react";
import { ButtonWarning } from "./ButtonWarning";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";
import { Heading,SubHeading } from "./Heading";
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signin(){
     
    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();

    const navigate=useNavigate();

    return <div className="h-screen flex justify-center items-center">
        <div className="border border-slate-300 shadow-2xl shadow-slate-300 p-4 rounded-xl flex flex-col gap-4 w-90">
          
      <Heading label={'Sign In'}></Heading>
      <SubHeading label={'Enter your credentials to access your account'}></SubHeading>

      <CustomInput onchange={(e)=>{
            setUserName(e.target.value);
      }} label={'Username'} placeholder={'shivam1121'}></CustomInput>

      <CustomInput onchange={(e)=>{
        setPassword(e.target.value);
      }} label={"Password"} placeholder={'•••••••'} ></CustomInput>

      <CustomButton label={'Sign In'} onclick={async()=>{
         const toastId=toast.loading("Processing... ⏳");
         try{

          const dataToBeSend={
            userName:userName,
            password:password
           }
           
           const res=await axios.post('https://swiftwallet-uq9a.onrender.com/user/signin',dataToBeSend);

           await new Promise((res)=>setTimeout(res,1000));

           console.log(res.data);
            toast.update(toastId,{
              type:"success",
              render:res.data.message,
              isLoading:false,
              autoClose:1000
            });
              localStorage.setItem('token',res.data.token);
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

      }} ></CustomButton>
      
      <ButtonWarning label={"Don't have an Account?"} buttonText={'Sign Up'} to={'/signup'}></ButtonWarning>
    </div>
      <ToastContainer/>
    </div>
}
