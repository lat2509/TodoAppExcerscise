import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { useDraggable } from '@dnd-kit/core';
import type { DragTodoProps } from '../../type/todo';
import { useTodoStore } from '../../stores/useTodoStore';
import { useNavigate } from 'react-router-dom';

const DraggableTodo: React.FC<DragTodoProps> = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id.toString(),
  });

  const navigator = useNavigate();
  const handleDeleteTodo = useTodoStore(state => state.handleDeleteTodo);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <>
      <ul ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <li className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm hover:cursor-grab hover:border-cyan-400">
          <span className="overflow-hidden">{todo.name}</span>
          <div className="flex gap-1">
            <button
              onPointerDown={e => {
                e.stopPropagation();
              }}
              onClick={() => {
                navigator(`${todo.id}/edit`);
              }}
              className="hover:text-blue-400"
            >
              <FiEdit />
            </button>
            <button
              onPointerDownCapture={e => {
                e.stopPropagation();
              }}
              onClick={() => handleDeleteTodo(todo.id)}
              className="hover:text-red-600"
            >
              <TiDeleteOutline className="text-2xl" />
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default DraggableTodo;
