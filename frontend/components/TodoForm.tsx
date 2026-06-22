"use client";

import { useState } from "react";
import { TodoFormData } from "@/types/todo";

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => Promise<void>;
  initialData?: TodoFormData;
  buttonText?: string;
}

export default function TodoForm({ onSubmit, initialData, buttonText = "Add Task" }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      setFormError(null);
      await onSubmit({ title: title.trim(), description: description.trim() });
      if (!initialData) {
        setTitle("");
        setDescription("");
      }
    } catch (err: any) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      {formError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">{formError}</div>
      )}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Task Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish project architecture report"
          maxLength={100}
          required
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add operational specifics or links..."
          rows={3}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 transition-all text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? "Processing..." : buttonText}
      </button>
    </form>
  );
}
