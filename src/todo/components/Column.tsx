// src/Column.tsx
import { useDroppable } from '@dnd-kit/core';
import type { ColumnComponentProps, TodoApi } from '../../type/todo';
import DraggableTodo from './Dragtodo';
import { useQuery } from '@tanstack/react-query';
import { sortTodoListByStatus } from '../../api/todoApi';

const Column: React.FC<ColumnComponentProps> = ({ col, sortConfigs }) => {
  const { setNodeRef } = useDroppable({ id: col.id });

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos', col.id, sortConfigs.sortBy, sortConfigs.sortOrder],
    queryFn: async () => {
      const res = await sortTodoListByStatus(col.id, sortConfigs.sortBy, sortConfigs.sortOrder);
      return res.data.data.todos;
    }
  })

  if (isLoading) {
    return (
      <div ref={setNodeRef} className="flex min-h-2 flex-col gap-3">
        <div className="p-4 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div ref={setNodeRef} className="flex min-h-2 flex-col gap-3">
        <div className="p-4 text-center text-red-500">Error loading todos</div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className="flex min-h-2 flex-col gap-3">
      {todos
        .map((todo: TodoApi) => (
          <DraggableTodo key={todo.id} todo={todo} />
        ))}
    </div>
  );
};

export default Column;
