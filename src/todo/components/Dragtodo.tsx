import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { useDraggable } from '@dnd-kit/core';
import type { DragTodoProps } from '../types';
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
        <li className="border rounded-lg p-3 flex justify-between items-center hover:cursor-grab hover:border-cyan-400 bg-white shadow-sm">
          <span className="overflow-hidden">{todo.todo}</span>
          <div className="flex gap-1">
            <button
              onPointerDown={e => {
                e.stopPropagation();
              }}
              onClick={() => {
                navigator(`${todo.id}/edit`)
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
