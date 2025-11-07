import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Task from '../todo/components/Task';
import { updateTodoStatusApi } from '../api/todoApi';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTodoStore from '../stores/useTodoStore';

const TodoPages = () => {
  const sortConfigs = useTodoStore(state => state.sortConfigs);

  const onSortChange = useTodoStore(state => state.onSortChange)

  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (variables: { id: string, status: string }) => updateTodoStatusApi(variables.id, variables.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const handleUpdateTodoStatus = async (id: string, status: string) => {
    await updateStatusMutation.mutateAsync({ id, status });
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id === over.id) {
      return;
    }
    const overId = over.id as string;
    handleUpdateTodoStatus(String(active.id), overId.toUpperCase());
  };

  // const handleSortChange = (status: TodoStatus, sortBy: string, sortOrder: string) => {
  //   setSortConfigs(prev => ({
  //     ...prev,
  //     [status]: { sortBy, sortOrder },
  //   }))
  // }

  return (
    <div className="hide-scrollbar flex max-h-full h-full w-full flex-row justify-around overflow-scroll 2xl:overflow-hidden 2xl:max-h-screen">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Task sortConfigs={sortConfigs} onSortChange={onSortChange} />
      </DndContext>
    </div>
  );
};

export default TodoPages;
