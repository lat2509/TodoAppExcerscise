import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Task from '../todo/components/Task';
import { useTodoStore } from '../stores/useTodoStore';
import { useEffect } from 'react';

const TodoPages = () => {
  const { updateTodoStatus } = useTodoStore();

  const { fetchTodo } = useTodoStore();

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
  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id === over.id) {
      return;
    }
    const overId = over.id as string;
    updateTodoStatus(String(active.id), overId.toUpperCase());
  };

  return (
    <div className="hide-scrollbar flex max-h-full w-full flex-row justify-around overflow-scroll 2xl:overflow-hidden">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Task />
      </DndContext>
    </div>
  );
};

export default TodoPages;
