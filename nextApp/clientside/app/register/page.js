"use client";


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

   

    const [data, setData] = useState({
        name: "",
        mobile: "",
        gender: "",
        country: "",
        hobbies: [],
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [mobile, setMobile] = useState("");
    const [mobileex, setMobileex] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usererr, setUsererr] = useState("");
    const[success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: name === 'hobbies' ? value.split(',').map(hobby => hobby.trim()) : value,
        });
    };

    const signin =()=>{
        router.push('/login')
    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // Code to execute after 30 seconds
    //         handleSubmit();
    //         router.push('/login');
    //         console.log('This code executes after 30 seconds');
    //     }, 5000); // 30 seconds in milliseconds

    //     return () => clearTimeout(timer); // Clear the timer if the component unmounts or the effect runs again
    // }, []);

    // useEffect(() => {
    //     if (success) {
    //         router.push('/login');
    //     }
    // }, [success],30000);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMobile("");
        setMobileex("");
        setEmailError("");
        setUsererr("");


    //     useEffect(() => {
    //         router.push('/login')
            
    //    }, []); 

        try {
            const response = await axios.post('http://localhost:7000/users', data);
            console.log("success");
            setSuccess("account created successfully..")
        } catch (error) {
            console.log("heloo", error);
            if (error.response.status === 400) {
                setMobile("Mobile number must be 10 digits");
            } if (error.response.status === 501) {
                setMobileex("Mobile number already exists")
            }
            if (error.response.status === 600) {
                setEmailError("Email already exists")
            } if (error.response.status === 502) {
                setUsererr("User already exists")
            }
        }
        setTimeout(() => {
            router.push('/login');
        }, 10000);
    };

    return (
        <div className="bg-black min-h-screen flex justify-center items-center">
        
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
                <h1 className="text-3xl font-semibold text-center mb-4 text-red-500">User Registration</h1>
                {
            success && <div className=' bg-red-700'>{success} </div>
        }
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-white" htmlFor="name">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-white" htmlFor="mobile">Mobile</label>
                            <input
                                required
                                type="text"
                                name="mobile"
                                value={data.mobile}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Mobile"
                            />
                            {mobile && <p className="text-red-500 text-sm mt-1">{mobile}</p>}
                            {mobileex && <p className="text-red-500 text-sm mt-1">{mobileex}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-white" htmlFor="gender">Gender</label>
                            <input
                                required
                                type="text"
                                name="gender"
                                value={data.gender}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Gender"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-white" htmlFor="country">Country</label>
                            <input
                                required
                                type="text"
                                name="country"
                                value={data.country}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Country"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-white" htmlFor="hobbies">Hobbies</label>
                            <input
                                required
                                type="text"
                                name="hobbies"
                                value={data.hobbies.join(', ')}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Hobbies (comma-separated)"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-white" htmlFor="email">Email</label>
                            <input
                                required
                                type="text"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Email"
                            />
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-white" htmlFor="password">Password</label>
                            <input
                                required
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Register
                        </button>
                        {usererr && <p className="text-red-500 text-sm mt-1">{usererr}</p>}
                    </div>
                </form>
                 <span className="text-red-500 text-sm mt-1">already user ?.....</span><button onClick={signin} className="text-red-500 text-sm mt-1">sign in</button>
            </div>
        </div>
    );
};

export default Page;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const Page = () => {
//     const router = useRouter();

//     const [data, setData] = useState({
//         name: "",
//         mobile: "",
//         gender: "",
//         country: "",
//         hobbies: [],
//         email: "",
//         password: "",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [mobileex, setMobileex] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [usererr, setUsererr] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: name === 'hobbies' ? value.split(',').map(hobby => hobby.trim()) : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMobile("");
//         setMobileex("");
//         setEmailError("");
//         setUsererr("");

//         try {
//             const response = await axios.post('http://localhost:7000/users', data);
//             console.log("success");
//         } catch (error) {
//             console.log("heloo", error);
//             if (error.response.status === 400) {
//                 setMobile("Mobile number must be 10 digits");
//             } if (error.response.status === 501) {
//                 setMobileex("Mobile number already exists")
//             }
//             if (error.response.status === 600) {
//                 setEmailError("Email already exists")
//             } if (error.response.status === 502) {
//                 setUsererr("User already exists")
//             }
//         }
//     };

//     return (
//         <div className=" bg-red-900 min-h-screen flex justify-center items-center">
//             <div className="bg-white p-3 rounded-lg shadow-md w-full  md:w-1/2 lg:w-1/3">
//                 <h1 className="text-3xl font-semibold text-center mb-4">User Registration</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block mb-1" htmlFor="name">Name</label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="name"
//                                 value={data.name}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Name"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1" htmlFor="mobile">Mobile</label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="mobile"
//                                 value={data.mobile}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Mobile"
//                             />
//                             {mobile && <p className="text-red-500 text-sm mt-1">{mobile}</p>}
//                             {mobileex && <p className="text-red-500 text-sm mt-1">{mobileex}</p>}
//                         </div>
//                         <div>
//                             <label className="block mb-1" htmlFor="gender">Gender</label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="gender"
//                                 value={data.gender}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Gender"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1" htmlFor="country">Country</label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="country"
//                                 value={data.country}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Country"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1" htmlFor="hobbies">Hobbies</label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="hobbies"
//                                 value={data.hobbies.join(', ')}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Hobbies (comma-separated)"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1" htmlFor="email">Email</label>
//                             <input
//                                 required
//                                 type="text"
//                                 name="email"
//                                 value={data.email}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Email"
//                             />
//                             {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//                         </div>
//                         <div>
//                             <label className="block mb-1" htmlFor="password">Password</label>
//                             <input
//                                 required
//                                 type="password"
//                                 name="password"
//                                 value={data.password}
//                                 onChange={handleChange}
//                                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                                 placeholder="Password"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
//                         >
//                             Register
//                         </button>
//                         {usererr && <p className="text-red-500 text-sm mt-1">{usererr}</p>}
//                     </div>
//                 </form>
//                 {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
//                 {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
//             </div>
//         </div>
//     );
// };

// export default Page;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const Page = () => {
//     const router = useRouter();

//     const [data, setData] = useState({
//         name: "",
//         mobile: "",
//         gender: "",
//         country: "",
//         hobbies: [],
//         email: "",
//         password: "",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [mobileex, setMobileex] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [usererr, setUsererr] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: name === 'hobbies' ? value.split(',').map(hobby => hobby.trim()) : value, // Split comma-separated hobbies into an array
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMobile("");
//         setMobileex("");
//         setEmailError("");
//         setUsererr("");

//         try {
//             const response = await axios.post('http://localhost:7000/users', data);
//             console.log("success");
//         } catch (error) {
//             console.log("heloo", error);
//             if (error.response.status === 400) {
//                 setMobile("mobile number must be 10 digits");
//             } if (error.response.status === 501) {
//                 setMobileex("already exists")
//             }
//             if (error.response.status === 600) {
//                 setEmailError("email already exists")
//             } if (error.response.status === 502) {
//                 setUsererr("user already exists")
//             }
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit} className='bg-black'>
//                 <div className="max-w-md mx-auto text-white">
//                     <h1>Name</h1>
//                     <input
//                         required
//                         type="text"
//                         name="name"
//                         value={data.name}
//                         onChange={handleChange}
//                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Name"
//                     />
//                     <h1>Mobile</h1>
//                     <input
//                         required
//                         type="text"
//                         name="mobile"
//                         value={data.mobile}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Mobile"
//                     />
//                     {
//                         mobile && <div className='bg-red-600'>{mobile}</div>
//                     }
//                     {
//                         mobileex && <div className='bg-red-600'>{mobileex}</div>
//                     }
//                     <h1>Gender</h1>
//                     <input
//                         required
//                         type="text"
//                         name="gender"
//                         value={data.gender}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Gender"
//                     />
//                     <h1>Country</h1>
//                     <input
//                         required
//                         type="text"
//                         name="country"
//                         value={data.country}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Country"
//                     />
//                     <h1>Hobbies</h1>
//                     <input
//                         required
//                         type="text"
//                         name="hobbies"
//                         value={data.hobbies.join(', ')} // Join hobbies array to display comma-separated values
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Hobbies (comma-separated)"
//                     />
//                     <h1>Email</h1>
//                     <input
//                         required
//                         type="text"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Email"
//                     />
//                     {
//                         emailError && <div>{emailError}</div>
//                     }
//                     <h1>Password</h1>
//                     <input
//                         required
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Password"
//                     />
//                 </div>
//                 <button type="submit" className="mt-4 block w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Submit</button>
//                 {
//                     usererr && <div className='bg-red-600'>{usererr}</div>
//                 }
//             </form>
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//             {successMessage && <p className="text-green-500">{successMessage}</p>}
//         </div>
//     );
// };

// export default Page;

// // import React,{useState} from 'react'
// // import axios from 'axios';

// // const page = () => {

// //  const unserInput = useState({
// //         name : "",
// //         mobile: "",
// //         gender: "",
// //         country :"",
// //         hobbies:[],
// //         email:"",
// //         password:"",
// //     });

// //     const [data, setData] = useState(unserInput);


// //     const handle = async (e)=>{
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post('http://localhost:7000/users', data);
// //             console.log("succes");
// //         } catch (error) {
// //             console.log(error.message);
// //         }

// //     }
// //     const handleChange=(e)=>{
// //         const { name, value } = e.target;
// //         setData({
// //           ...data,
// //           [name]: value,
// //         });
// //     }

// //   return (
// //     <div>
      
// //   <form  onSubmit={handle}>
// // <div className="max-w-md mx-auto" >
// //   <h1>Name</h1>
// //             <input
// //                 type="text"
// //                 name="name"
// //                 value={data.name}
// //                 onChange={handleChange}
// //                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Name"
// //             />
// //             <h1>mobile</h1>
// //             <input
// //                 type="text"
// //                 name="mobile"
// //                 value={data.mobile}
// //                 onChange={handleChange}
// //                 className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Mobile"
// //             />
// //             <h1>gender</h1>
// //               <input
// //                 type="text"
// //                 name="gender"
// //                 value={data.gender}
// //                 onChange={handleChange}
// //                 className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Mobile"
// //             />
// //               <h1>country</h1>
// //               <input
// //                 type="text"
// //                 name="country"
// //                 value={data.country}
// //                 onChange={handleChange}
// //                 className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Mobile"
// //             />
// //               <h1>hobbies</h1>
// //               <input
// //                 type="text"
// //                 name="hobbies"
// //                 pattern="[a-zA-Z]+"
// //                 value={data.hobbies}
// //                 onChange={handleChange}
// //                 className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Mobile"
// //             />
// //               <h1>email</h1>
// //               <input
// //                 type="text"
// //                 name="email"
// //                 value={data.email}
// //                 onChange={handleChange}
// //                 className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Mobile"
// //             />
// //               <h1>password</h1>
// //               <input
// //                 type="text"
// //                 name="password"
// //                 value={data.password}
// //                 onChange={handleChange}
// //                 className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                 placeholder="Mobile"
// //             />
        
// //         </div>
// //         <button>click me</button>
// //         </form>
    
// //     </div>
// //   )
// // }

// // export default page


// import React, { useState } from 'react';
// import axios from 'axios';
// // import { useRouter } from 'next/router';
// import { useRouter } from 'next/navigation';


// const Page = () => {
//     const router = useRouter();
    
//     const [data, setData] = useState({
//         name: "",
//         mobile: "",
//         gender: "",
//         country: "",
//         hobbies: [],
//         email: "",
//         password: "",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [mobileex, setMobileex] = useState("");
//     const [emailError, setEmailError]= useState("");
//     const[usererr, setUsererr] = useState("");

   
//     // State for success message

    

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: name === 'hobbies' ? value.split(',').map(hobby => hobby.trim()) : value, // Split comma-separated hobbies into an array
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMobile("");
//         setMobileex("");
//         setEmailError("");
//         setUsererr("");
        
//         // setData({
//         //     name: "",
//         // mobile: "",
//         // gender: "",
//         // country: "",
//         // hobbies: [],
//         // email: "",
//         // password: "",
//         // })


//         // const isEmpty = Object.values(data).some(value => value === "");

//         // if (isEmpty) {
//         //     setNews(isEmpty)
            
//         //     console.log("Please fill in all fields");
            
//         //     return;
//         //      // Stop form submission if any field is empty
//         // }
//         try {
//             const response = await axios.post('http://localhost:7000/users', data);
//             console.log("success");
//             // router.push('/login');
//             //  if(response.data.status === 200){
//             //     console.log("hello");
//             //  }
            
//         } catch (error) {
//             console.log( "heloo",error);
//             if(error.response.status === 400 ){
//                 setMobile("mobile number must be 10 digits");
//                 // setMobile("mobile extixs")
                
//                 console.log("mobile");
//             }if( error.response.status === 501){
//                 setMobileex("already extis")
//             }
//             if(error.response.status === 600){
//                 setEmailError("email already extis")
//             }if(error.response.status === 502){
//                 setUsererr("user already exits")

//             }
//             // if (error.response && error.response.status === 500) {
//             //     setErrorMessage("User already exists."); // Set error message for user duplication
//             // } 
            
//             // else {
//             //     setErrorMessage("An error occurred. Please try again."); // Set generic error message for other errors
//             // }
           

          
//         }
        
//     };

//     return (
//         <div>
        
//             <form onSubmit={handleSubmit} className=' bg-black'>
//                 <div className="max-w-md mx-auto text-white" >
//                     <h1>Name</h1>
//                     <input
//                       required
//                         type="text"
//                         name="name"
//                         value={data.name}
//                         onChange={handleChange}
//                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Name"
//                     />
//                     <h1>Mobile</h1>
//                     <input
//                         required
//                         type="text"
//                         name="mobile"
//                         value={data.mobile}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Mobile"
//                     />
//                     {
                        
//             mobile &&<div className=' bg-red-600'> {mobile}</div> 
            
            
//         }
//         {
//             mobileex &&<div className=' bg-red-600'> {mobileex}</div> 
//         }
//                     <h1>Gender</h1>
//                     <input
//                         required
//                         type="text"
//                         name="gender"
//                         value={data.gender}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Gender"
//                     />
// {/* 
// <select name="Gender" value={data.gender} onChange={handleChange} className=' text-black'>
//               <option value="male">male</option>
//               <option value="female">female</option>
              
//             </select> */}
//                     <h1>Country</h1>
//                     <input
//                     required
//                         type="text"
//                         name="country"
//                         value={data.country}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Country"
//                     />
//                     <h1>Hobbies</h1>
//                     <input
//                     required
//                         type="text"
//                         name="hobbies"
//                         value={data.hobbies.join(', ')} // Join hobbies array to display comma-separated values
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Hobbies (comma-separated)"
//                     />
//                     <h1>Email</h1>
//                     <input
//                     required
//                         type="text"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Email"
//                     />
//                     {
//                         emailError && <div>{emailError}</div>
//                     }
//                     <h1>Password</h1>
//                     <input
//                     required
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-black"
//                         placeholder="Password"
//                     />
//                 </div>
//                 <button type="submit" className="mt-4 block w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Submit</button>
//                 {
//                     usererr && <div className=' bg-red-600'> {usererr} </div>
//                 }
//             </form>
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//               {successMessage && <p className="text-green-500">{successMessage}</p>}
//         </div>
//     );
// };

// export default Page;


 
 