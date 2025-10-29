import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { useDraggable } from '@dnd-kit/core';
import type { DragTodoProps } from '../../type/todo';
import { useTodoStore } from '../../stores/useTodoStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const DraggableTodo: React.FC<DragTodoProps> = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });

  const navigator = useNavigate();
  const handleDeleteTodo = useTodoStore(state => state.handleDeleteTodo);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (showConfirmDialog && !dialog.open) {
      dialog.showModal();
    }
    if (!showConfirmDialog && dialog.open) {
      dialog.close();
    }
  }, [showConfirmDialog]);

  const handleShowConfirmDialog = () => {
    console.log('click');
    setShowConfirmDialog(true);
  };

  const handleOffConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleSaveDelete = async (id: string) => {
    try {
      await handleDeleteTodo(id);
      handleOffConfirmDialog();
      toast.success('Todo deleted successfully!');
    } catch (error) {
      console.error('Deletion failed in component:', error);
      handleOffConfirmDialog();
      toast.error('Failed to delete todo.');
    }
  };

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
              onClick={() => handleShowConfirmDialog()}
              className="hover:text-red-600"
            >
              <TiDeleteOutline className="text-2xl" />
            </button>
          </div>
        </li>
      </ul>
      {showConfirmDialog && (
        <dialog
          ref={dialogRef}
          className="m-auto w-full max-w-sm rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
        >
          <p>{`Are you sure you want to delele "${todo.name}"`} </p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => {
                handleSaveDelete(todo.id);
              }}
              className="rounded-full border bg-red-500 px-4 py-2 text-white"
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleOffConfirmDialog();
              }}
              className="rounded-full border border-gray-300 bg-gray-300 p-2"
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DraggableTodo;
