 "use client";

// import React,{useState, useEffect} from 'react'
// import axios from 'axios';

// import pageyes from '../page'

// const lists = () => {
//     const [todos, setTodos] = useState([]);
//     let [filteredItems, setFilteredItems] = useState([]); 
//     const [statusFilter, setStatusFilter] = useState('');

//     const handleDelete = async (todoId) => {
//         try {
//             await axios.delete(`http://localhost:7000/todos/${todoId}`);
            
//             getTodos();
//         } catch (error) {
//             console.log(error.message);
//         }
//     };


//     const getTodos = async () => {
//         try {
//           const response = await axios.get("http://localhost:7000/todos");
          
           
//           setTodos(response.data);
//         } catch (error) {
//           console.log(error.message);
//         }
//       };
    
//       useEffect(() => {
//         getTodos();
//     }, []);


//     const handleFilter = (event) => 
//   {
//     const selectedStatus = event.target.value;
//     setStatusFilter(selectedStatus);

//     if(selectedStatus === "Show All Task")
//     {
//       let newFilteredItems = todos;
//       setFilteredItems(newFilteredItems);
//     }
//     else{
//       let newFilteredItems = selectedStatus ? todos.filter(item => item.status === selectedStatus) : todoss;
//       setFilteredItems(newFilteredItems);
//     }
    
//   };
//   return (
//     <div>
//         <ul>
//                 {todos.map(todo => (
//                     <div className=' bg-slate-500 p-6 border-red-400'>
//                     <li >{todo.Name}</li>
//                     <li >{todo.Description}</li>
//                     <li >{todo.Time}</li>
//                     <li >{todo.Status}</li>
//                     <button className=' bg-red-600 rounded-lg p-2 mt-4'  onClick={() => handleDelete(todo.id)}>click to delete</button>
//                     {/* <button className=' ml-2 bg-green-600 p-2 font-bold' onClick={toggleModal}  >click to edit</button> */}
//                     </div>
                    
//                 ))}
//             </ul>
            
//             <select name="status" id="status"  onChange={handleFilter} value={statusFilter} required>
//         <option value="Show All Task">Show All Task</option>
//         <option value="in Progress">In Progress</option>
//         <option value="Completed">Completed</option>
//       </select>
//     </div>
//   )
// }

// export default lists













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Lists = () => {
//     const [todos, setTodos] = useState([]);
//     const [filteredTodos, setFilteredTodos] = useState([]);
//     const [statusFilter, setStatusFilter] = useState('');
    


//     const handleUpdate = async () => {
//         try {
//           await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, data);
           
//         } catch (error) {
//           console.log(error.message);
//         }
//       };

//     const getTodos = async () => {
//         try {
//             const response = await axios.get("http://localhost:7000/todos");
//             setTodos(response.data);
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     useEffect(() => {
//         getTodos();
//     }, []);

//     useEffect(() => {
//         if (statusFilter === 'Show All Task' || statusFilter === '') {
//             setFilteredTodos(todos);
//         } else {
//             setFilteredTodos(todos.filter(todo => todo.Status.toLowerCase() === statusFilter.toLowerCase()));
//         }
//     }, [statusFilter, todos]);

//     const handleDelete = async (todoId) => {
//         try {
//             await axios.delete(`http://localhost:7000/todos/${todoId}`);
//             getTodos();
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     const handleFilterChange = (event) => {
//         setStatusFilter(event.target.value);
//     };

   

//     return (
//         <div>
//         <select className=' bg-black text-white' name="status" id="status" onChange={handleFilterChange} value={statusFilter}>
//                 <option value="Show All Task">Show All Task</option>
//                 <option value="In_Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//             </select>
//             <ul>
//                 {filteredTodos.map(todo => (
//                     <div className='bg-slate-500 p-6 border-red-400' key={todo.id}>
//                         <li>{todo.Name}</li>
//                         <li>{todo.Description}</li>
//                         <li>{todo.Time}</li>
//                         <li>{todo.Status}</li>
//                         <button className='bg-red-600 rounded-lg p-2 mt-4' onClick={() => handleDelete(todo.id)}>click to delete</button>
//                         <button className=' ml-2 bg-green-600 p-2 font-bold' onClick={handleUpdate}   >click to edit</button>
//                     </div>
//                 ))}
//             </ul>

             
            
            
//         </div>



//     );
// };

// export default Lists;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoModal from '@/app/alltodo/page';

const Lists = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    


 

    const [formData, setFormData] = useState({
        Name: "",
        Description: "",
        Time: "",
        Status: ""
    });
    const [showModal, setShowModal] = useState(false);

    const getTodos = async () => {
        try {
            const response = await axios.get("http://localhost:7000/todos");
            setTodos(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        if (statusFilter === 'Show All Task' || statusFilter === '') {
            setFilteredTodos(todos);
        } else {
            setFilteredTodos(todos.filter(todo => todo.Status.toLowerCase() === statusFilter.toLowerCase()));
        }
    }, [statusFilter, todos]);

    const handleDelete = async (todoId) => {
        try {
            await axios.delete(`http://localhost:7000/todos/${todoId}`);
            getTodos();
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setFormData(todo);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7000/todos/${selectedTodo.id}`, formData);
            setShowModal(false);
            getTodos();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <select className='bg-black text-white' name="status" id="status" onChange={handleFilterChange} value={statusFilter}>
                <option value="Show All Task">Show All Task</option>
                <option value="In_Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <ul>
                {filteredTodos.map(todo => (
                    <div className='bg-slate-500 p-6 border-red-400' key={todo.id}>
                        <li>{todo.Name}</li>
                        <li>{todo.Description}</li>
                        <li>{todo.Time}</li>
                        <li>{todo.Status}</li>
                        <button className='bg-red-600 rounded-lg p-2 mt-4' onClick={() => handleDelete(todo.id)}>click to delete</button>
                        <button className='ml-2 bg-green-600 p-2 font-bold' onClick={() => isOpen(todo)}>click to edit</button>
                    </div>
                ))}
            </ul>
            {/* {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <form onSubmit={handleSubmit}>
                            <h1>Edit Todo</h1>
                            <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                            <input type="text" name="Description" value={formData.Description} onChange={handleChange} />
                            <input type="time" name="Time" value={formData.Time} onChange={handleChange} />
                            <select name="Status" value={formData.Status} onChange={handleChange}>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Lists;