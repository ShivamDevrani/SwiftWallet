import { useNavigate } from "react-router-dom";
import { ButtonWarning } from "./ButtonWarning";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";
import { Heading,SubHeading } from "./Heading";
import { useState } from "react";

import {ToastContainer,toast} from 'react-toastify'

import axios from "axios"


export default function Signup(){
      const [firstName,setFirstName]=useState("");
      
      const [lastName,setLastName]=useState("");

      const [password,setPassword]=useState("");

      const [userName,setUserName]=useState("");
      
      const navigate=useNavigate();

    return <div className="h-screen flex justify-center items-center">
      

        <div className=" border border-gray-300 shadow-2xl shadow-slate-300 p-4 rounded-xl flex flex-col gap-4 w-90">
      <Heading label={'Sign Up'}></Heading>

      <SubHeading label={'Enter Your information to create an account'}></SubHeading>

      <CustomInput onchange={(e)=>{
             setFirstName(e.target.value);
  
      }} label={'First Name'} placeholder={'John'}></CustomInput>

      <CustomInput onchange={(e)=>{
        setLastName(e.target.value);
      }} label={'Last Name'} placeholder={'Doe'}></CustomInput>

      <CustomInput onchange={(e)=>{
        setUserName(e.target.value);
      }} label={'Username'} placeholder={'shivam1121'}></CustomInput>

      <CustomInput onchange={(e)=>{
        setPassword(e.target.value);
      }} label={"Password"} placeholder={'•••••••'} ></CustomInput>

      <CustomButton onclick={async()=>{
       
        const toastId=toast.loading("Processing... ⏳");
         try{

          const dataToBeSend={
            firstName:firstName,
            lastName:lastName,
            userName:userName,
            password:password
           }
           
           const res=await axios.post('http://localhost:3000/user/signup',dataToBeSend);
           await new Promise(res=>setTimeout(res,1000));
           console.log(res.data);

            toast.update(toastId,{
              type:"success",
              render:res.data.message,
              isLoading:false,
              autoClose:1000
            });
            
            await new Promise(res=>setTimeout(res,1000));
            localStorage.setItem('token',res.data.token);

            navigate('/dashboard');
         }
         catch(err)
         {
            console.log(err.response?.data?.message);
            toast.update(toastId,{
              type:"error",
              render: err.response?.data?.message || "Something Went Wrong ❌",
              isLoading:false,
              autoClose:3000
            })
         }

      }} label={'Sign up'} ></CustomButton>
      
      <ButtonWarning label={'Already have an Account?'} buttonText={'Sign in'} to={'/signin'}></ButtonWarning>
      
    </div>
     
     <ToastContainer/>


    </div>
}

