 "use client";

 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoModal from '../alltodo/page'; // Adjust the import path as per your project structure
import { useRouter } from 'next/navigation';
const PageYes = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:7000/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:7000/todos/${todoId}`);
      fetchTodos();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedTodo(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedTodo) {
        await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, formData);
      } else {
        await axios.post('http://localhost:7000/todos', formData);
      }
      fetchTodos();
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const logout =()=>{
    router.push('/login')
  }

  return (
    
    <div className="container mx-auto p-4">
    <button onClick={logout}>logout</button>
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create Todo
      </button>

      <ul>
        {todos.map(todo => (
          <div key={todo.id} className="bg-gray-200 p-6 mb-4 rounded-md">
            <li className="mb-2"><strong>Name:</strong> {todo.Name}</li>
            <li className="mb-2"><strong>Description:</strong> {todo.Description}</li>
            <li className="mb-2"><strong>Time:</strong> {todo.Time}</li>
            <li className="mb-2"><strong>Status:</strong> {todo.Status}</li>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(todo)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </ul>

      <TodoModal
        isOpen={showModal}
        onClose={handleCloseModal}
        todoToUpdate={selectedTodo}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PageYes;


//  import React, { useState, useEffect } from 'react';
//  import axios from 'axios';
//  import TodoModal from '../alltodo/page'; // Adjust the import path as per your project structure
 
//  const PageYes = () => {
//    const [showModal, setShowModal] = useState(false);
//    const [todos, setTodos] = useState([]);
//    const [selectedTodo, setSelectedTodo] = useState(null);
 
//    const fetchTodos = async () => {
//      try {
//        const response = await axios.get("http://localhost:7000/todos");
//        setTodos(response.data);
//      } catch (error) {
//        console.log(error.message);
//      }
//    };
 
//    useEffect(() => {
//      fetchTodos();
//    }, []);
 
//    const handleDelete = async (todoId) => {
//      try {
//        await axios.delete(`http://localhost:7000/todos/${todoId}`);
//        fetchTodos();
//      } catch (error) {
//        console.log(error.message);
//      }
//    };
 
//    const handleEdit = (todo) => {
//      setSelectedTodo(todo);
//      setShowModal(true);
//    };
 
//    const handleCreate = () => {
//      setSelectedTodo(null);
//      setShowModal(true);
//    };
 
//    const handleCloseModal = () => {
//      setShowModal(false);
//      setSelectedTodo(null);
//    };
 
//    const handleSubmit = async (formData) => {
//      try {
//        if (selectedTodo) {
//          await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, formData);
//        } else {
//          await axios.post('http://localhost:7000/todos', formData);
//        }
//        fetchTodos();
//        handleCloseModal();
//      } catch (error) {
//        console.error('Error:', error);
//      }
//    };
 
//    return (
//      <div>
//        <button onClick={handleCreate}>Create Todo</button>
 
//        <ul>
//          {todos.map(todo => (
//            <div key={todo.id} className=' bg-slate-500 p-6 border-red-400'>
//              <li>{todo.Name}</li>
//              <li>{todo.Description}</li>
//              <li>{todo.Time}</li>
//              <li>{todo.Status}</li>
//              <button onClick={() => handleDelete(todo.id)}>Delete</button>
//              <button onClick={() => handleEdit(todo)}>Edit</button>
//            </div>
//          ))}
//        </ul>
 
//        <TodoModal
//          isOpen={showModal}
//          onClose={handleCloseModal}
//          todoToUpdate={selectedTodo}
//          onSubmit={handleSubmit}
//        />
//      </div>
//    );
//  };
 
//  export default PageYes;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TodoModal from '../alltodo/page'; // Adjust the import path as per your project structure

// const PageYes = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [todos, setTodos] = useState([]);
//   const [selectedTodo, setSelectedTodo] = useState(null);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get("http://localhost:7000/todos");
//       setTodos(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleDelete = async (todoId) => {
//     try {
//       await axios.delete(`http://localhost:7000/todos/${todoId}`);
//       fetchTodos();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleEdit = (todo) => {
//     setSelectedTodo(todo);
//     setShowModal(true);
//   };

//   const handleCreate = () => {
//     setSelectedTodo(null);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedTodo(null);
//   };

//   const handleSubmit = async (formData) => {
//     try {
//       if (selectedTodo) {
//         await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, formData);
//       } else {
//         await axios.post('http://localhost:7000/todos', formData);
//       }
//       fetchTodos();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleCreate}>Create Todo</button>

//       <ul>
//         {todos.map(todo => (
//           <div key={todo.id} className=' bg-slate-500 p-6 border-red-400'>
//             <li>{todo.Name}</li>
//             <li>{todo.Description}</li>
//             <li>{todo.Time}</li>
//             <li>{todo.Status}</li>
//             <button onClick={() => handleDelete(todo.id)}>Delete</button>
//             <button onClick={() => handleEdit(todo)}>Edit</button>
//           </div>
//         ))}
//       </ul>

//       <TodoModal
//         isOpen={showModal}
//         onClose={handleCloseModal}
//         todoToUpdate={selectedTodo}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default PageYes;



//  import React, { useState, useEffect } from 'react';
//  import axios from 'axios';
// //  import TodoModal from './TodoModal';
// import TodoModal from '../alltodo/page'; // Adjust the import path as per your project structure
 
//  const PageYes = () => {
//    const [showModal, setShowModal] = useState(false);
//    const [todos, setTodos] = useState([]);
//    const [selectedTodo, setSelectedTodo] = useState(null);
 
//    const fetchTodos = async () => {
//      try {
//        const response = await axios.get("http://localhost:7000/todos");
//        setTodos(response.data);
//      } catch (error) {
//        console.log(error.message);
//      }
//    };
 
//    useEffect(() => {
//      fetchTodos();
//    }, []);
 
//    const handleDelete = async (todoId) => {
//      try {
//        await axios.delete(`http://localhost:7000/todos/${todoId}`);
//        fetchTodos();
//      } catch (error) {
//        console.log(error.message);
//      }
//    };
 
//    const handleEdit = (todo) => {
//      setSelectedTodo(todo);
//      setShowModal(true);
//    };
 
//    const handleCreate = () => {
//      setSelectedTodo(null);
//      setShowModal(true);
//    };
 
//    const handleCloseModal = () => {
//      setShowModal(false);
//      setSelectedTodo(null);
//    };
 
//    const handleUpdate = () => {
//      fetchTodos();
//      handleCloseModal();
//    };
 
//    const handleSubmit = async (formData) => {
//      try {
//        if (selectedTodo) {
//          await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, formData);
//        } else {
//          await axios.post('http://localhost:7000/todos', formData);
//        }
//        fetchTodos();
//        handleCloseModal();
//      } catch (error) {
//        console.error('Error:', error);
//      }
//    };
 
//    return (
//      <div>
//        <button onClick={handleCreate}>Create Todo</button>
 
//        <ul>
//          {todos.map(todo => (
//            <div key={todo.id} className=' bg-slate-500 p-6 border-red-400'>
//              <li>{todo.Name}</li>
//              <li>{todo.Description}</li>
//              <li>{todo.Time}</li>
//              <li>{todo.Status}</li>
//              <button onClick={() => handleDelete(todo.id)}>Delete</button>
//              <button onClick={() => handleEdit(todo)}>Edit</button>
//            </div>
//          ))}
//        </ul>
 
//        <TodoModal
//          isOpen={showModal}
//          onClose={handleCloseModal}
//          todoToUpdate={selectedTodo}
//          onUpdate={handleUpdate}
//          onCreate={handleUpdate}
//          onSubmit={handleSubmit}
//        />
//      </div>
//    );
//  };
 
//  export default PageYes;










// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // import { useRouter } from 'next/navigation';
// // import TodoModal from '../alltodo/page';



 
 



// // const pageyes = () => {
// //  const router = useRouter();
// //     const [show, setShow] = useState(false);
// //   //   const [isOpen, setIsOpen] = useState(false);

// //   // const toggleModal = () => {
// //   //   setIsOpen(!isOpen);
// //   // };

  



// //     const [data, setData] = useState({
// //         Name:"",
// //         Description:"",
// //         Time:"",
// //         Status:""
// //     });



// //     const handleUpdate = async () => {
// //         try {
// //             await axios.put(`http://localhost:7000/todos/${selectedTodoId}`, data);
// //             // Update the todo item in the frontend UI (if needed)
// //             // Close the modal
// //             setShowModal(false);
// //             // Reset form data
// //             setData({ Name: "", Description: "", Time: "", Status: "" });
// //         } catch (error) {
// //             console.log(error.message);
// //         }
// //     };



// //     const [todos, setTodos] = useState([]);



// //     // const handleUpdate = async () => {
// //     //     try {
// //     //       await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, data);
// //     //       getTodos();
// //     //       toggleModal();
// //     //     } catch (error) {
// //     //       console.log(error.message);
// //     //     }
// //     //   };

// //     const logOut =()=>{
// //          router.push('/login')
// //     }

   

// //     const handleDelete = async (todoId) => {
// //         try {
// //             await axios.delete(`http://localhost:7000/todos/${todoId}`);
            
// //             getTodos();
// //         } catch (error) {
// //             console.log(error.message);
// //         }
// //     };

// //     const getTodos = async () => {
// //         try {
// //           const response = await axios.get("http://localhost:7000/todos");
          
           
// //           setTodos(response.data);
// //         } catch (error) {
// //           console.log(error.message);
// //         }
// //       };
    
// //       useEffect(() => {
// //         getTodos();
// //     }, []);
    
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setData({
// //             ...data,
// //             [name]:value, // Split comma-separated hobbies into an array
// //         });
// //     };
    
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //          setData({
// //             Name:"",
// //             Description:"",
// //             Time:"",
// //             Status:""
// //         })
        
       
       

// //         try {
// //             const response = await axios.post('http://localhost:7000/todos', data);
// //              getTodos();
// //             console.log("success");
// //             // router.push('/login');
            
            
// //         } catch (error) {
// //             console.log(error.message);
// //         } 

       
         
// //     };
    
    

// //   return (
// //     <div>
// //      <form onSubmit={handleSubmit} className=' bg-black text-white '>
// //      {/* <button className=' bg-green-500 text-black p-2 rounded-2xl font-semibold' onClick={logOut}>log out</button> */}
     
// //                 <div className="max-w-md mx-auto">
// //                     <h1>Name</h1>
// //                     <input
// //                         type="text"
// //                         name="Name"
// //                         value={data.Name}
// //                         onChange={handleChange}
// //                         className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                         placeholder="Name"
// //                     />
// //                     <h1>Description</h1>
// //                     <input
// //                         type="text"
// //                         name="Description"
// //                         value={data.Description}
// //                         onChange={handleChange}
// //                         className="block w-full mt-4 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                         placeholder="description"
// //                     />
// //                     <h1>Time</h1>
// //                     <input
// //                         type="time"
// //                         name="Time"
// //                         value={data.Time}
// //                         onChange={handleChange}
// //                         className="block w-full mt-4 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                         placeholder="time"
// //                     />
// //                     <h1>Status</h1>
// //                     {/* <input
// //                         type="text"
// //                         name="Status"
// //                         value={data.Status}
// //                         onChange={handleChange}
// //                         className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
// //                         placeholder="Country"
// //                     /> */}
// //                     <select id="status" name="Status" value={data.Status} onChange={handleChange} className=' text-black'>
// //     <option value="pending">Pending</option>
// //     <option value="in_progress">In Progress</option>
// //     <option value="completed">Completed</option>
// //     <option value="cancelled">Cancelled</option>
// //   </select>
// //   <button className=' bg-white text-black ml-56 p-1 rounded-sm'>Add todo</button>
// //                     </div>
                    
// //                 </form>
// //                 <button >create</button>

               

// //                 <ul>
// //                 {todos.map(todo => (
// //                     <div className=' bg-slate-500 p-6 border-red-400'>
// //                     <li >{todo.Name}</li>
// //                     <li >{todo.Description}</li>
// //                     <li >{todo.Time}</li>
// //                     <li >{todo.Status}</li>
// //                     <button className=' bg-red-600 rounded-lg p-2 mt-4'  onClick={() => handleDelete(todo.id)}>click to delete</button>
// //                     <button className=' ml-2 bg-green-600 p-2 font-bold'   >click to edit</button>
// //                     </div>
                    
// //                 ))}
// //             </ul>
      
// // {/*  
// //             <button
// //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //         onClick={toggleModal}
// //       >
// //         Open Modal
// //       </button>
// //        {isOpen && (
// //         <div className="fixed z-10 inset-0 overflow-y-auto">
// //           <div className="flex items-center justify-center min-h-screen">
// //             <div className="fixed inset-0 transition-opacity" onClick={toggleModal}>
// //               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
// //             </div>
// //             <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
// //               <div className="p-4">
// //                 <div className="flex items-start justify-between">
// //                   <h3 className="text-lg font-bold">Modal Title</h3>
// //                   <button onClick={toggleModal}>
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       className="h-6 w-6 text-gray-700 hover:text-gray-900"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M6 18L18 6M6 6l12 12"
// //                       />
// //                     </svg>
// //                   </button>
// //                 </div>
// //                 <div className="mt-2">
// //                   <input type="text" placeholder='name' value={data.Name} name='Name' />
// //                   <input type="text" placeholder='name' value={data.Description} />
// //                   <input type="text" placeholder='name' value={data.Time} />
// //                   <input type="text" placeholder='name' value={data.Status} />
// //                 </div>
// //                 <div className="mt-4 flex justify-end">
// //                   <button
// //                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //                     onClick={toggleModal}
// //                   >
// //                     Close
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}  */}


     
     
// //     </div>
// //   )
// // }

// // export default pageyes