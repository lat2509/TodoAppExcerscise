import { useNavigate } from 'react-router-dom';
import type { NewTodo, TodoApi, TodoStatus, } from '../../type/todo';
import TodoFormModal from './TodoFormModal';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addNewTodoApi } from '../../api/todoApi';
import useTodoStore from '../../stores/useTodoStore';

const AddNewTodoModal = () => {
  const queryClient = useQueryClient();
  const sortConfigs = useTodoStore(state => state.sortConfigs)

  const addMutation = useMutation({
    mutationFn: addNewTodoApi,
    onMutate: async (newTodo: NewTodo) => {
      const status = newTodo.status as TodoStatus;
      const queryKey = [
        'todos',
        status,
        sortConfigs[status].sortBy,
        sortConfigs[status].sortOrder
      ];

      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<TodoApi[]>(queryKey);

      const optimisticNewTodo: TodoApi = {
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdById: "optimistic-user",
        ...newTodo
      };

      queryClient.setQueryData<TodoApi[]>(queryKey, (old = []) =>
        [optimisticNewTodo, ...old]
      );

      return { previousTodos, queryKey, status };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTodos && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousTodos);
      }
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
  });

  const handleSubmitApi = async (data: NewTodo) => {
    await addMutation.mutateAsync(data);
  };

  const navigator = useNavigate();

  const handleSuccess = () => {
    navigator('/todo');
  };
  return (
    <TodoFormModal onSubmitApi={handleSubmitApi} onSuccess={handleSuccess} />
  );
};

export default AddNewTodoModal;
