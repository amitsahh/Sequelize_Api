"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";


const LoginForm = () => {


    const [data, setData] = useState({
        name : "",
        mobile: "",
        gender: "",
        country :"",
        hobbies:"",
        email:"",
        password:"",
    });

    // const handleChange =(e)=>{
    //     // console.log(e.target);
    //     // const {name, value}= e.target;
    //     // setData ((prev)=>{
    //     //     return {...prev, [name]: value}
    //     // })
    //     const name = e.target.name;
    //     const value = e.target.value;
        

    //     setData((prev)=>{
    //         return {...prev, [name]:value}
            
            
    //     })
        
    // }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handle=(e)=>{
        e.preventDefault();

    }
  

  return (
    <div>


<div className="max-w-md mx-auto" onSubmit={handle}>
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Name"
            />
            <input
                type="text"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Mobile"
            />
            {/* Add more inputs similarly for other fields */}
        </div>
    
    
       
    </div>
  )
}

export default LoginForm
