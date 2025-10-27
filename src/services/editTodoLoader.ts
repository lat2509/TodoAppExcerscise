import type { LoaderFunctionArgs } from 'react-router-dom';
import axiosInterceptors from '../api/axiosInterceptors';
export const editTodoLoader = async ({ params }: LoaderFunctionArgs) => {
  const { todoId } = params;
  if (!todoId) {
    throw new Error('ID not found');
  }
  try {
    const res = await axiosInterceptors.get(`/todo/${todoId}`);
    return res.data;
  } catch (error) {
    console.error('Loaded failed', error);
  }
};
