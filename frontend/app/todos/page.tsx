"use client";

import { useTodos } from "@/hooks/useTodos";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function TodosDashboard() {
  const { todos, loading, error, filter, setFilter, search, setSearch, addTodo, updateTodo, deleteTodo, toggleTodo } =
    useTodos();

  return (
    <main className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Creation Utility Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task Control Engine</h1>
            <p className="text-xs text-slate-500 mt-1">Production Client Board</p>
          </div>
          <TodoForm onSubmit={addTodo} />
        </div>

        {/* Dynamic Read / Interaction Pipeline List Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Filtering Control Bar Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search index target title..."
                className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0x"
                />
              </svg>
            </div>

            <div className="flex rounded-lg bg-slate-100 p-0.5 space-x-0.5 self-start sm:self-auto">
              {(["all", "completed", "pending"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filter === type ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  {type === "pending" ? "Not Completed" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Core Content Layout Switcher States */}
          {error && (
            <div className="p-4 text-sm bg-red-50 text-red-700 border border-red-100 rounded-xl flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
          )}
        </div>
      </div>
    </main>
  );
}
