 "use client";


 import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { Cookie } from 'next/font/google';
// import Cookies from 'js-cookie';
import Cookies from "universal-cookie";
 

const Page = () => {
    const cookies = new Cookies();
    const router = useRouter();

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [emailerr, setEmailerr] = useState("");
    const [passworderr, setPassworderr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailerr("");
        setPassworderr("");

        try {
            const response = await axios.post('http://localhost:7000/login', data);
            console.log("Response:", response.data);

            // Extract token from the response
            // const { token } = response.data;
            // const { user, token } = response.data;
            cookies.set('token', token, { expires: 1 });
            // Set the token in cookies
           // document.cookie = `token=${token}; path=/todos`; // Set the cookie with path

           const { token } = response.data;
            
            // Store token in localStorage
            localStorage.setItem('token', token);

            console.log("Cookie:", document.cookie);
            setErrorMessage(""); // Clear any previous error message
            setSuccessMessage("Login successful!"); // Set success message
            router.push("/todos");

            

           

        } catch (error) {
            if(error.response.status === 401){
                setEmailerr("email is wrong")
            }
            if(error.response.status === 402){
                setPassworderr("password is wrong")
            }
            console.log(error.message);
            setErrorMessage("Incorrect email or password"); // Set error message for login failure
            setSuccessMessage("");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800">Email</label>
                    <input
                        required
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                        placeholder="Enter your email"
                    />
                    {emailerr && <h2 className='text-red-500 mt-2'>{emailerr}</h2>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-800">Password</label>
                    <input
                        required
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                        placeholder="Enter your password"
                    />
                    {passworderr && <h2 className='text-red-500 mt-2'>{passworderr}</h2>}
                </div>
                <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                    Login
                </button>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            </form>
        </div>
    );
};

export default Page;

//  import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const Page = () => {
//     const router = useRouter();

//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [emailerr, setEmailerr] = useState("");
//     const [passworderr, setPassworderr] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setEmailerr("");
//         setPassworderr("")

//         try {
//             const response = await axios.post('http://localhost:7000/login', data);
//             console.log("Response:", response.data);
//             // document.cookie = "user=John"; // Set cookie
//             // document.cookie = `token=${token}; expires=${new Date(expiresIn)}`;
//             console.log("Cookie:", document.cookie);
//             setErrorMessage(""); // Clear any previous error message
//             setSuccessMessage("Login successful!"); // Set success message
//             router.push("/todos");
//         } catch (error) {
//             if(error.response.status === 401){
//                 setEmailerr("email is wrong")

//             }
//             if(error.response.status === 402){
//                   setPassworderr("password is wrong")
//             }
//             console.log(error.message);
//             setErrorMessage("Incorrect email or password"); // Set error message for login failure
//             setSuccessMessage("");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
//             <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md p-8 max-w-md w-full">
//                 <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Login</h1>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-gray-800">Email</label>
//                     <input
//                         required
//                         type="text"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                         placeholder="Enter your email"
//                     />
//                     {
//                         emailerr && <h2 className=' text-red-500 mt-2"'>{emailerr}</h2>
//                     }
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-gray-800">Password</label>
//                     <input
//                         required
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                         placeholder="Enter your password"
//                     />
//                      {
//                         passworderr && <h2 className=' text-red-500 mt-2"'>{passworderr}</h2>
//                     }
//                 </div>
//                 <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
//                     Login
//                 </button>
//                 {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//                 {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//             </form>
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
//         email: "",
//         password: "",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:7000/login', data);
//             console.log("Response:", response.data);
//             document.cookie = "user=John"; // Set cookie
//             console.log("Cookie:", document.cookie);
//             setErrorMessage(""); // Clear any previous error message
//             setSuccessMessage("Login successful!"); // Set success message
//             router.push("/todos");
//         } catch (error) {
//             console.log(error.message);
//             setErrorMessage("Incorrect email or password"); // Set error message for login failure
//             setSuccessMessage("");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-red-700">
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
//                 <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-gray-700">Email</label>
//                     <input
//                         required
//                         type="text"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                         placeholder="Enter your email"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-gray-700">Password</label>
//                     <input
//                         required
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
//                         placeholder="Enter your password"
//                     />
//                 </div>
//                 <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">
//                     Login
//                 </button>
//                 {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//                 {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//             </form>
//         </div>
//     );
// };

// export default Page;

// import React,{useState} from 'react'
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// // import { cookies } from 'next/headers'



// const page = () => {
//   const router = useRouter();
 

//     const unserInput = useState({
       
//         email:"",
//         password:"",
//     });
//     const [data, setData] = useState(unserInput);
    
//     const [errorMessage, setErrorMessage] = useState(""); // State for error message
//     const [successMessage, setSuccessMessage] = useState("");
     


//     const handle = async (e)=>{
//         e.preventDefault();
//         setData({
//           email:"",
//         password:"",
//         })

//         try {
//             const response = await axios.post('http://localhost:7000/login', data);
//             console.log(" response message",  response.data );
//             document.cookie = "user=John";
//             console.log("succes", document.cookie);
//              // Set success message
//              setErrorMessage(""); // Clear any previous error message
//              setSuccessMessage("Login successful!");
//             router.push("/todos");
             
//         } catch (error) {
//             console.log(error.message);
//             setErrorMessage("Incorrect email or password"); // Set error message for login failure
//             setSuccessMessage("");
 
//         }

//     }
//     const handleChange=(e)=>{
//         const { name, value } = e.target;
//         setData({
//           ...data,
//           [name]: value,
//         });
//     }

    
//   return (
//     <div>
//     <form onSubmit={handle} className=' bg-black' >
   
//        <h1 className=' text-white'>email</h1>
//               <input
//               required
//                 type="text"
//                 name="email"
//                 value={data.email}
//                 onChange={handleChange}
//                 className="block  mt-4  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 w-48"
//                 placeholder="email..."
//             />
//               <h1 className=' text-white'>password</h1>
//               <input
//               required
//                 type="text"
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 className="block w-48 mt-4  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//                 placeholder="password..."
//             />
//             <button className=' text-black font-bold border-yellow-400 p-2 bg-yellow-500 mt-4 rounded-lg'>submit</button>
//             </form>
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Render error message if present */}
//                 {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Render success message if present */}
            
      
//     </div>
//   )
// }

// export default page
