import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '../../stores/useTodoStore';
import type { NewTodo } from '../../type/todo';
import TodoFormModal from './TodoFormModal';

const AddNewTodoModal = () => {
  const handleAddTodo = useTodoStore(state => state.handleAddTodo);
  const navigator = useNavigate();
  const handleSubmitApi = async (data: NewTodo) => {
    await handleAddTodo(data);
  };
  const handleSuccess = () => {
    navigator('/todo');
  };
  return (
    <TodoFormModal onSubmitApi={handleSubmitApi} onSuccess={handleSuccess} />
  );
};

export default AddNewTodoModal;
