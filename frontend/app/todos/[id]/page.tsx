"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Todo } from "@/types/todo";
import { todoApi } from "@/lib/api";

export default function TodoDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetailedTodo = async () => {
      try {
        setLoading(true);
        const data = await todoApi.getById(id);
        setTodo(data);
      } catch (err: any) {
        setError(err.message || "Failed to retrieve detailed task record");
      } finally {
        setLoading(false);
      }
    };
    fetchDetailedTodo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="animate-pulse flex space-x-4 max-w-md w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800">
        <div className="max-w-md w-full bg-white p-6 rounded-xl border border-red-200 text-center shadow-sm">
          <div className="h-10 w-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            ⚠️
          </div>
          <h2 className="text-lg font-bold text-slate-900">Resource Exception</h2>
          <p className="text-sm text-slate-500 mt-1">
            {error || "The requested item data profile could not be reached."}
          </p>
          <a
            href="/todos"
            className="inline-block mt-4 text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            Return to Board Hub
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-16 px-4 text-slate-800">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <a
            href="/todos"
            className="text-xs font-medium text-slate-500 hover:text-blue-600 flex items-center space-x-1 transition-colors"
          >
            <span>← Back to Control Engine</span>
          </a>
          <span
            className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full ${todo.completed ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}
          >
            {todo.completed ? "Completed" : "Pending Action"}
          </span>
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{todo.title}</h1>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
            {todo.description || (
              <span className="italic text-slate-400">No descriptive brief specified for this operational task.</span>
            )}
          </p>

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-[11px] text-slate-400 font-medium">
            <div>
              <span className="block text-slate-500 font-semibold mb-0.5">REGISTERED ON</span>
              {new Date(todo.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="block text-slate-500 font-semibold mb-0.5">LAST REVISION</span>
              {new Date(todo.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
