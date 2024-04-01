"use client";

import React, { useState, useEffect } from "react";

const TodoModal = ({ isOpen, onClose, todoToUpdate, onSubmit }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Time: "",
    Status: "",
  });

  // Function to handle form submission for creating or updating todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      Name: "",
      Description: "",
      Time: "",
      Status: "",
    });
    try {
      await onSubmit(formData);
      onClose(); // Close the modal after successful operation
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Set initial form data if todoToUpdate is provided (for updating)
  useEffect(() => {
    if (todoToUpdate) {
      setFormData(todoToUpdate);
    }
  }, [todoToUpdate]);

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">
              {todoToUpdate ? "Update Todo" : "Create Todo"}
            </p>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Name"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Description"
                type="text"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Time"
              >
                Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Time"
                type="time"
                name="Time"
                value={formData.Time}
                onChange={handleChange}
                placeholder="Time"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Status"
              >
                Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Status"
                name="Status"
                value={formData.Status}
                onChange={handleChange}
                required
              >
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {todoToUpdate ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;

//  import React, { useState, useEffect } from 'react';

//  const TodoModal = ({ isOpen, onClose, todoToUpdate, onSubmit }) => {
//    const [formData, setFormData] = useState({
//      Name: '',
//      Description: '',
//      Time: '',
//      Status: '',
//    });

//    // Function to handle form submission for creating or updating todo
//    const handleSubmit = async (e) => {

//      e.preventDefault();
//      setFormData({
//         Name: '',
//         Description: '',
//         Time: '',
//         Status: '',
//      })
//      try {
//        await onSubmit(formData);
//        onClose(); // Close the modal after successful operation
//      } catch (error) {
//        console.error('Error:', error);
//        // Handle error (e.g., show error message to the user)
//      }
//    };

//    // Function to handle form input changes
//    const handleChange = (e) => {
//      const { name, value } = e.target;
//      setFormData({ ...formData, [name]: value });
//    };

//    // Set initial form data if todoToUpdate is provided (for updating)
//    useEffect(() => {
//      if (todoToUpdate) {
//        setFormData(todoToUpdate);
//      }
//    }, [todoToUpdate]);

//    return (
//      <div className={`modal ${isOpen ? 'show' : ''}`}>
//        <div className="modal-content">
//          <span className="close" onClick={onClose}>&times;</span>
//          <h2>{todoToUpdate ? 'Update Todo' : 'Create Todo'}</h2>
//          <form onSubmit={handleSubmit}>
//            <input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" required />
//            <input type="text" name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" required />
//            <input type="time" name="Time" value={formData.Time} onChange={handleChange} placeholder="Time" required />
//            <select name="Status" value={formData.Status} onChange={handleChange} required>

//              <option value="in_progress">In Progress</option>
//              <option value="completed">Completed</option>

//            </select>
//            <button type="submit">{todoToUpdate ? 'Update' : 'Create'}</button>
//          </form>
//        </div>
//      </div>
//    );
//  };

//  export default TodoModal;

//  import React, { useState } from 'react';
// import axios from 'axios';

// const TodoModal = ({ isOpen, onClose, todoToUpdate, onUpdate, onCreate }) => {
//   const [formData, setFormData] = useState({
//     Name: '',
//     Description: '',
//     Time: '',
//     Status: '',
//   });

//   // Function to handle form submission for creating or updating todo
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (todoToUpdate) {
//         // If todoToUpdate is provided, it means we're updating an existing todo
//         await axios.put(`http://localhost:7000/todos/${todoToUpdate.id}`, formData);
//         onUpdate(); // Call onUpdate callback to refresh todo list after update
//       } else {
//         // Otherwise, we're creating a new todo
//         await axios.post('http://localhost:7000/todos', formData);
//         onCreate(); // Call onCreate callback to refresh todo list after creation
//       }
//       onClose(); // Close the modal after successful operation
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error (e.g., show error message to the user)
//     }
//   };

//   // Function to handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Set initial form data if todoToUpdate is provided (for updating)
//   React.useEffect(() => {
//     if (todoToUpdate) {
//       setFormData(todoToUpdate);
//     }
//   }, [todoToUpdate]);

//   return (
//     <div className={`modal ${isOpen ? 'show' : ''}`}>
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>{todoToUpdate ? 'Update Todo' : 'Create Todo'}</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" required />
//           <input type="text" name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" required />
//           <input type="time" name="Time" value={formData.Time} onChange={handleChange} placeholder="Time" required />
//           <select name="Status" value={formData.Status} onChange={handleChange} required>
//             <option value="pending">Pending</option>
//             <option value="in_progress">In Progress</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//           <button type="submit">{todoToUpdate ? 'Update' : 'Create'}</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TodoModal;
