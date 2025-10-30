import { create } from 'zustand';
import type { TodoApi, TodoState } from '../type/todo';
import {
  addNewTodoApi,
  deleteTodoApi,
  todoListApi,
  updateTodoApi,
  updateTodoStatusApi,
} from '../api/todoApi';

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  fetchTodo: async () => {
    try {
      const res = await todoListApi();
      console.log(res.data.data);
      const todoFromApi = res.data.data.todos;
      set({ todos: todoFromApi });
    } catch (error) {
      console.error('error', error);
    }
  },

  handleAddTodo: async dataPost => {
    try {
      const response = await addNewTodoApi(dataPost);
      const savedTodo: TodoApi = response.data.data.todo;
      console.log(savedTodo);
      set(state => ({
        todos: [...state.todos, savedTodo],
      }));
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  },

  handleDeleteTodo: async id => {
    try {
      const res = await deleteTodoApi(id);
      console.log(res.data.success);
      set(state => ({
        todos: state.todos.filter(t => t.id !== id),
      }));
    } catch (error) {
      console.error('failed to delete', error);
    }
  },

  updateTodoStatus: async (id, status) => {
    const originTodo = get().todos;
    const optimisticTodo = originTodo.map(t =>
      t.id === id ? { ...t, status } : t,
    );
    set({ todos: optimisticTodo });
    try {
      const res = await updateTodoStatusApi(id, status);
      console.log(res.data.data.todo);
      const updateTodo = res.data.data.todo;
      set(state => ({
        todos: state.todos.map(t => (t.id === id ? updateTodo : t)),
      }));
    } catch (error) {
      console.error('failed to update status', error);
    }
  },

  updateTodo: async (id, data) => {
    try {
      const res = await updateTodoApi(id, data);
      console.log(res.data);
      const updateTodo = res.data.data.todo;
      set(state => ({
        todos: state.todos.map(t => (t.id === id ? updateTodo : t)),
      }));
    } catch (error) {
      console.error('failed to update', error);
    }
  },
}));
