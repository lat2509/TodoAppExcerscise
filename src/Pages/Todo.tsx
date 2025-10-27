import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import Task from '../todo/components/Task';
import { useTodoStore } from '../stores/useTodoStore';
import { useState, useEffect } from 'react';
import DraggableTodo from '../todo/components/Dragtodo';

const TodoPages = () => {
  const { todos, updateTodoStatus } = useTodoStore();

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const { fetchTodo } = useTodoStore();

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }
    if (active.id === over.id) {
      setActiveId(null);
      return;
    }
    updateTodoStatus(String(active.id), over.id as string);
    setActiveId(null);
  };

  const activeTodo = activeId
    ? todos.find(todo => todo.id === activeId)
    : null;

  return (
    <div className="flex max-h-screen w-full flex-row justify-around overflow-hidden">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Task />
        <DragOverlay>
          {activeTodo ? <DraggableTodo todo={activeTodo} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TodoPages;
