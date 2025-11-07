import { useNavigate, useLoaderData } from 'react-router-dom';
import type { NewTodo, TodoApi, TodoStatus } from '../../type/todo';
import TodoFormModal from './TodoFormModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodoApi } from '../../api/todoApi';
import useTodoStore from '../../stores/useTodoStore';

const EditTodoModal = () => {
  const navigator = useNavigate();
  const todo = useLoaderData() as TodoApi;
  const queryClient = useQueryClient();
  const sortConfigs = useTodoStore((state) => state.sortConfigs);

  const editMutation = useMutation({
    mutationFn: (variables: { id: string, data: NewTodo }) =>
      updateTodoApi(variables.id, variables.data),

    onMutate: async (variables) => {
      const oldStatus = todo.status as TodoStatus;
      const newStatus = variables.data.status as TodoStatus;

      const oldQueryKey = [
        'todos',
        oldStatus,
        sortConfigs[oldStatus].sortBy,
        sortConfigs[oldStatus].sortOrder
      ];

      const newQueryKey = [
        'todos',
        newStatus,
        sortConfigs[newStatus].sortBy,
        sortConfigs[newStatus].sortOrder
      ];

      await queryClient.cancelQueries({ queryKey: oldQueryKey });
      if (oldStatus !== newStatus) {
        await queryClient.cancelQueries({ queryKey: newQueryKey });
      }
      await queryClient.cancelQueries({ queryKey: ['todo', variables.id] });

      const previousOldColumnTodos = queryClient.getQueryData<TodoApi[]>(oldQueryKey);
      const previousNewColumnTodos = oldStatus !== newStatus
        ? queryClient.getQueryData<TodoApi[]>(newQueryKey)
        : undefined;
      const previousTodo = queryClient.getQueryData<TodoApi>(['todo', variables.id]);

      const updatedTodo: TodoApi = { ...todo, ...variables.data };

      queryClient.setQueryData<TodoApi[]>(oldQueryKey, (old = []) =>
        old.filter(t => t.id !== variables.id)
      );

      if (oldStatus !== newStatus) {
        queryClient.setQueryData<TodoApi[]>(newQueryKey, (old = []) =>
          [updatedTodo, ...old]
        );
      } else {
        queryClient.setQueryData<TodoApi[]>(oldQueryKey, (old = []) =>
          old.map(t => t.id === variables.id ? updatedTodo : t)
        );
      }

      queryClient.setQueryData<TodoApi>(['todo', variables.id], updatedTodo);

      return {
        previousOldColumnTodos,
        previousNewColumnTodos,
        previousTodo,
        oldQueryKey,
        newQueryKey,
        oldStatus,
        newStatus
      };
    },

    onError: (_error, variables, context) => {
      if (context) {
        if (context.previousOldColumnTodos) {
          queryClient.setQueryData(context.oldQueryKey, context.previousOldColumnTodos);
        }

        if (context.oldStatus !== context.newStatus && context.previousNewColumnTodos) {
          queryClient.setQueryData(context.newQueryKey, context.previousNewColumnTodos);
        }

        if (context.previousTodo) {
          queryClient.setQueryData(['todo', variables.id], context.previousTodo);
        }
      }
    },

    onSettled: (_data, _error, variables, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: context.oldQueryKey });

        if (context.oldStatus !== context.newStatus) {
          queryClient.invalidateQueries({ queryKey: context.newQueryKey });
        }

        queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
      }
    }
  });

  const handleUpdateTodoApi = async (data: NewTodo) => {
    await editMutation.mutateAsync({ id: todo.id, data });
  };

  const handleSubmit = () => {
    navigator('/todo');
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