// src/Column.tsx
import { useDroppable } from '@dnd-kit/core';
import type { ColumnProps } from '../../type/todo';
import DraggableTodo from './Dragtodo';
import { useTodoStore } from '../../stores/useTodoStore';

const Column: React.FC<ColumnProps> = ({ col }) => {
  const { setNodeRef } = useDroppable({ id: col.id });
  const todos = useTodoStore(state => state.todos);

  return (
    <div
      ref={setNodeRef}
      className="flex max-h-96 min-h-96 flex-col gap-3"
    >
      {todos
        .filter(todo => todo.status.replaceAll("_", '').toLowerCase() === col.id.toLowerCase())
        .map(todo => (
          <DraggableTodo key={todo.id} todo={todo} />
        ))}
    </div>
  );
};

export default Column;
