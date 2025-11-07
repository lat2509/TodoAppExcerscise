import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { useDraggable } from '@dnd-kit/core';
import type { DragTodoProps, TodoApi } from '../../type/todo';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodoApi } from '../../api/todoApi';

const DraggableTodo: React.FC<DragTodoProps> = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });

  const navigator = useNavigate();
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
    setShowConfirmDialog(true);
  };

  const handleOffConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodoApi,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData(['todos']);
      queryClient.setQueryData<TodoApi[]>(['todos'], (old) => {
        return old ? old.filter(t => t.id !== id) : [];
      })
      return { previousTodos }
    },
    onError: (_error, _variable, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context?.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })

  const handleDeleteTodo = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  }

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
    zIndex: transform ? 50 : "auto",
    touchAction: 'none',
  };

  const startDate = todo.startDate.split('T')[0];

  const endDate = todo.endDate.split('T')[0];

  const priorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-green-400';
      case 'medium':
        return 'bg-yellow-400';
      case 'high':
        return 'bg-orange-400';
      case 'highest':
        return 'bg-red-400';
      case 'urgent':
        return 'bg-purple-400';
      default:
        return 'bg-gray-200';
    }
  }

  return (
    <>
      <ul ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <li className={"flex flex-col rounded-xl bg-white/90 p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-300 transition-all duration-200 cursor-pointer group"}>
          <div className='flex items-center justify-between'>
            <span className="overflow-hidden">{todo.name}</span>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <div className='flex flex-col items-start'>
              <span>{`From: ${startDate}`}</span>
              <span>{`To: ${endDate}`}</span>
            </div>
            <div className='flex flex-col items-end'>
              <span className={`rounded-full px-2 py-0.5 text-xs text-black font-semibold ${priorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
              <span>{`Assignee: ${todo.assignee}`}</span>
            </div>
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
