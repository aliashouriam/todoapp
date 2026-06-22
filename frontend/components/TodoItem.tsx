"use client";

import { useState } from "react";
import { Todo, TodoFormData } from "@/types/todo";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<TodoFormData>) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditSubmit = async (data: TodoFormData) => {
    await onUpdate(todo._id, data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative border border-blue-200 rounded-xl bg-blue-50/30 p-2">
        <TodoForm
          onSubmit={handleEditSubmit}
          initialData={{ title: todo.title, description: todo.description }}
          buttonText="Save Progress"
        />
        <button
          onClick={() => setIsEditing(false)}
          className="absolute top-8 right-6 text-xs text-slate-400 hover:text-slate-600 font-medium"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div
      className={`p-5 bg-white border rounded-xl shadow-sm transition-all flex items-start justify-between space-x-4 ${todo.completed ? "border-slate-100 bg-slate-50/50" : "border-slate-200 hover:border-slate-300"}`}
    >
      <div className="flex items-start space-x-3.5 flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo._id)}
          className={`mt-1 h-5 w-5 rounded-md flex items-center justify-center border transition-all ${
            todo.completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-slate-300 hover:border-blue-500 bg-white"
          }`}
        >
          {todo.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 stroke-[3]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <a
            href={`/todos/${todo._id}`}
            className={`font-medium block text-sm text-slate-900 truncate hover:text-blue-600 hover:underline ${todo.completed ? "line-through text-slate-400" : ""}`}
          >
            {todo.title}
          </a>
          {todo.description && (
            <p
              className={`text-xs mt-1 text-slate-500 line-clamp-2 ${todo.completed ? "line-through text-slate-300" : ""}`}
            >
              {todo.description}
            </p>
          )}
          <span className="inline-block mt-2 text-[10px] font-medium tracking-wide text-slate-400">
            Added {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-1 flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>

        {showDeleteConfirm ? (
          <div className="flex items-center space-x-1 bg-red-50 border border-red-100 rounded-lg p-0.5">
            <button
              onClick={() => onDelete(todo._id)}
              className="px-2 py-1 text-[11px] font-semibold bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
