'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFormData } from '@/types/todo';
import { todoApi } from '@/lib/api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [search, setSearch] = useState<string>('');

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const queryFilter = filter === 'all' ? undefined : filter;
      const data = await todoApi.getAll(queryFilter, search || undefined);
      setTodos(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching todos.');
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTodos();
    }, 300); // 300ms built-in debouncer for text lookup fields

    return () => clearTimeout(delayDebounceFn);
  }, [fetchTodos]);

  const addTodo = async (data: TodoFormData) => {
    try {
      const newTodo = await todoApi.create(data);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create todo');
    }
  };

  const updateTodo = async (id: string, data: Partial<TodoFormData>) => {
    try {
      const updated = await todoApi.update(id, data);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updated = await todoApi.toggle(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to toggle status');
    }
  };

  return {
    todos,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refresh: fetchTodos,
  };
}