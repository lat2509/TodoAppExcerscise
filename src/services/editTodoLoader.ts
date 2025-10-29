import type { LoaderFunctionArgs } from 'react-router-dom';
import { todoIdListApi } from '../api/todoApi';
export const editTodoLoader = async ({ params }: LoaderFunctionArgs) => {
  const { todoId } = params;
  if (!todoId) {
    throw new Error('ID not found');
  }
  try {
    const res = await todoIdListApi(todoId);
    console.log(res.data.data.todo);

    return res.data.data.todo;
  } catch (error) {
    console.error('Loaded failed', error);
  }
};
