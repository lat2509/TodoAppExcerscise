import axiosInstance from "./axiosInterceptors";

interface NewTodo {
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  assignee: string,
  priority: string,
  status: string,
}

export const addNewTodoApi = (data: NewTodo) => {
  return axiosInstance.post('/api/todos', data);
}

export const todoListApi = () => {
  return axiosInstance.get("/api/todos");
}

export const todoStatsApi = () => {
  return axiosInstance.get("/api/todos/stats");
}

export const todoIdListApi = (id: number) => {
  return axiosInstance.get(`/api/todos/${id}`);
}

export const updateTodoApi = (id: number, data: NewTodo) => {
  return axiosInstance.put(`/api/todos/${id}`, data);
}

export const deleteTodoApi = (id: number) => {
  return axiosInstance.delete(`/api/todos/${id}`);
}