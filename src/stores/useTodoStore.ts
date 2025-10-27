import { create } from 'zustand';
import type { TodoApi, TodoState } from '../type/todo';
import axiosClient from '../api/axiosInterceptors';
import { todoListApi } from '../api/todoApi';

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  fetchTodo: async () => {
    try {
      const res = await todoListApi();
      const todoFromApi = res.data.data.todos;
      set({ todos: todoFromApi });
    } catch (error) {
      console.error('error', error);
    }
  },

  handleAddTodo: async (text, col) => {
    try {
      const response = await axiosClient.post('/todos/add', {
        todo: text,
        completed: false,
        userId: 1,
      });
      const savedTodo: TodoApi = {
        ...response.data,
        status: col.toLowerCase(),
      };

      set(state => ({
        todos: [...state.todos, savedTodo],
      }));
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  },

  handleDeleteTodo: async id => {
    try {
      const res = await axiosClient.delete(`/todos/${id}`);
      console.log(res.data);
      set(state => ({
        todos: state.todos.filter(t => t.id !== id),
      }));
    } catch (error) {
      console.error('failed to delete', error);
    }
  },

  updateTodoStatus: (id, status) => {
    const updated = get().todos.map(t => (t.id === id ? { ...t, status } : t));
    localStorage.setItem('todos', JSON.stringify(updated));
    set({ todos: updated });
  },

  updateTodoText: async (id, newtext) => {
    try {
      const res = await axiosClient.put(`/todos/${id}`, {
        todo: newtext,
      });
      console.log(res.data);

      set(state => ({
        todos: state.todos.map(t =>
          t.id === id ? { ...t, todo: newtext } : t,
        ),
        showEdit: null,
      }));
    } catch (error) {
      console.error('failed to update', error);
    }
  },
}));
