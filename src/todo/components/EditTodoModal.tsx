import { useTodoStore } from '../../stores/useTodoStore';
import { useNavigate, useLoaderData } from 'react-router-dom';
import type { NewTodo, TodoApi } from '../../type/todo';
import TodoFormModal from './TodoFormModal';

const EditTodoModal = () => {
  const navigator = useNavigate();

  const updateTodo = useTodoStore(state => state.updateTodo);
  const todo = useLoaderData() as TodoApi;
  const handleSubmit = () => {
    navigator('/todo');
  };

  const handleUpdateTodoApi = async (data: NewTodo) => {
    await updateTodo(todo.id, data);
  };
  return (
    <TodoFormModal
      initialData={todo}
      onSubmitApi={handleUpdateTodoApi}
      onSuccess={handleSubmit}
    />
  );
};

export default EditTodoModal;
