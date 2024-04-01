"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoModal from "../ modal/page"; 
import { useRouter } from "next/navigation";

const PageYes = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

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

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    if (statusFilter === "Show All Task" || statusFilter === "") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(
        todos.filter(
          (todo) => todo.Status.toLowerCase() === statusFilter.toLowerCase()
        )
      );
    }
  }, [statusFilter, todos]);

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
        await axios.put(
          `http://localhost:7000/todos/${selectedTodo.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:7000/todos", formData);
      }
      fetchTodos();
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      {/* <button onClick={logout}>Logout</button> */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create Todo
      </button>
      <select
        className="bg-black text-white appearance-none border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-800"
        name="status"
        id="status"
        onChange={handleFilterChange}
        value={statusFilter}
      >
        <option value="Show All Task">Show All Task</option>
        <option value="in_Progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="bg-gray-200 p-6 mb-4 rounded-md">
            <li className="mb-2">
              <strong>Name:</strong> {todo.Name}
            </li>
            <li className="mb-2">
              <strong>Description:</strong> {todo.Description}
            </li>
            <li className="mb-2">
              <strong>Time:</strong> {todo.Time}
            </li>
            <li className="mb-2">
              <strong>Status:</strong> {todo.Status}
            </li>
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
