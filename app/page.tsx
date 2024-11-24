"use client"
import React, { useState } from "react";
import TodoItem from "./components/Todos";



interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Manage the list of todos.
  const [newTodo, setNewTodo] = useState(""); // Track the current input for adding new todos.

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; // Prevent adding empty todos.
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: newTodo, completed: false }, // Add a new todo with a unique id and default completion status.
    ]);
    setNewTodo(""); // Clear the input field.
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // Remove a todo by filtering it out based on id.
  };

  const handleEditTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo // Update the text of the matching todo by id.
      )
    );
  };

  const handleCompleteTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Toggle the completion status of the matching todo.
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)} 
            placeholder="Add a new todo"
            className="border rounded-l-md px-4 py-2 flex-grow"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 ml-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              onComplete={handleCompleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
