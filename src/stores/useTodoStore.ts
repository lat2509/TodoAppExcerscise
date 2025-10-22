import { create } from 'zustand';
import type { TodoApi, TodoState } from '../todo/types';
import axiosClient from '../axios-config/axiosClient';

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  showInput: null,
  showEdit: null,
  fetchTodo: async () => {
    try {
      const res = await axiosClient.get<{ todos: TodoApi[] }>('/todos/user/1');
      const todoFromApi = res.data.todos;
      const tranformTodo = todoFromApi.map(todoApi => ({
        ...todoApi,
        status: todoApi.completed ? 'Done' : 'Todo',
      }));
      set({ todos: tranformTodo });
    } catch (error) {
      console.log('error', error);
    }
  },

  handleShowInput: col =>
    set(state => ({
      showInput: state.showInput === col ? null : col,
    })),

  handleHideInput: () => set({ showInput: null }),

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
