import axiosInstance from './axiosInterceptors';
import type { NewTodo } from '../type/todo';

export const addNewTodoApi = (data: NewTodo) => {
  return axiosInstance.post('/api/todos', data);
};

export const todoListApi = () => {
  return axiosInstance.get('/api/todos');
};

export const todoStatsApi = () => {
  return axiosInstance.get('/api/todos/stats');
};

export const todoIdListApi = (id: string) => {
  return axiosInstance.get(`/api/todos/${id}`);
};

export const updateTodoApi = (id: string, data: NewTodo) => {
  return axiosInstance.put(`/api/todos/${id}`, data);
};

export const updateTodoStatusApi = (id: string, status: string) => {
  return axiosInstance.put(`/api/todos/${id}`, { status });
};

export const deleteTodoApi = (id: string) => {
  return axiosInstance.delete(`/api/todos/${id}`);
};

export const sortTodoListByStatus = (status: string, sortBy: string, sortOrder: string) => {
  return axiosInstance.get(`/api/todos`, {
    params: { status, sortBy, sortOrder }
  });
}