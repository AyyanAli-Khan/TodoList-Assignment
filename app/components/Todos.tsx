"use client"
import React, { useState } from "react";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onDelete,
  onEdit,
  onComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false); // Manage whether the current todo is in editing mode.
  const [newText, setNewText] = useState(text); // Temporarily store the updated text for editing.

  const handleSave = () => {
    if (newText.trim() !== "") { // Ensure the edited text is not empty.
      onEdit(id, newText); // Trigger the parent edit function to update the todo.
      setIsEditing(false); // Exit editing mode.
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b bg-white shadow-sm rounded-md">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)} // Update newText state as the user types.
          className="border rounded-md px-2 py-1 flex-grow w-full sm:w-auto"
        />
      ) : (
        <span
          className={`flex-grow text-center sm:text-left ${
            completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          {text} 
        </span>
      )}

      <div className="flex mt-2 sm:mt-0 space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-2 py-1 ml-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onComplete(id)}
              className={`px-2 py-1 rounded-md ${
                completed ? "bg-yellow-500" : "bg-green-500"
              } text-white`}
            >
              {completed ? "Undo" : "Complete"}
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(id)}
          className="px-2 py-1 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem
;
