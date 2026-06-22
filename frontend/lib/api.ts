import { ApiResponse, Todo, TodoFormData } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  const result: ApiResponse<T> = await response.json();
  return result.data;
}

export const todoApi = {
  getAll: async (filter?: 'completed' | 'pending', search?: string): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (filter) params.append('completed', filter === 'completed' ? 'true' : 'false');
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/todos?${params.toString()}`, {
      cache: 'no-store', 
    });
    return handleResponse<Todo[]>(res);
  },

  getById: async (id: string): Promise<Todo> => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, { cache: 'no-store' });
    return handleResponse<Todo>(res);
  },

  create: async (data: TodoFormData): Promise<Todo> => {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(res);
  },

  update: async (id: string, data: Partial<TodoFormData>): Promise<Todo> => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(res);
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete todo');
    }
  },

  toggle: async (id: string): Promise<Todo> => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, { method: 'PATCH' });
    return handleResponse<Todo>(res);
  },
};