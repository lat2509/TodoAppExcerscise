import { useRef, useEffect, useState } from 'react';
import { useTodoStore } from '../../stores/useTodoStore';
import { useNavigate, useBlocker, useLoaderData } from 'react-router-dom';
import type { TodoApi } from '../../type/todo';
import { TiDeleteOutline } from 'react-icons/ti';

const EditTodoModal = () => {
  const navigator = useNavigate();

  const updateTodoText = useTodoStore(state => state.updateTodoText);

  const todo = useLoaderData() as TodoApi;

  const [editText, setEditText] = useState(todo.name);

  const [isDirty, setIsDirty] = useState(false);

  const blocker = useBlocker(isDirty);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const blockerRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  useEffect(() => {
    const blockerDialog = blockerRef.current;
    if (!blockerDialog) return;
    if (blocker.state === 'blocked' && !blockerDialog.open) {
      blockerDialog.showModal();
    }

    if (blocker.state === 'unblocked' && blockerDialog.open) {
      blockerDialog.close();
    }
  }, [blocker.state]);

  const handleBlockerProcess = () => {
    blockerRef.current?.close();
    blocker.proceed?.();
  };

  const handleBlockerReset = () => {
    blockerRef.current?.close();
    blocker.reset?.();
  };
  const handleOnOffModel = () => {
    navigator('/todo');
  };

  const handleSave = async () => {
    if (!editText.trim()) {
      setEditText(todo.name);
      return;
    }
    setIsDirty(false);
    try {
      await updateTodoText(todo.id, editText);
      handleOnOffModel();
    } catch (error) {
      console.error('Failed to update', error);
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={e => {
          if (e.target === dialogRef.current) {
            handleOnOffModel();
          }
        }}
        className="m-auto w-full max-w-sm rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
      >
        <div className="flex justify-between">
          <p className="p-3 text-2xl">Update Todo</p>
          <button
            onClick={() => {
              handleOnOffModel();
            }}
            className="hover:text-red-600"
          >
            <TiDeleteOutline className="mr-3 text-2xl" />
          </button>
        </div>

        <div className="flex w-full flex-col justify-center p-2">
          <input
            id={editText}
            type="text"
            value={editText}
            onChange={e => {
              setEditText(e.target.value);
              setIsDirty(todo.name !== editText);
            }}
            autoFocus
            onKeyDown={e => e.stopPropagation()}
            className="mb-2 rounded-full border border-black px-3 py-2"
          />
          <div className="flex w-full justify-around">
            <button
              onPointerDown={e => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleSave();
              }}
              className="!mt-2 rounded-full border bg-cyan-400 px-4 py-2 text-white transition-colors duration-200 hover:bg-cyan-600"
            >
              save
            </button>
            <button
              onPointerDown={e => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleOnOffModel();
              }}
              className="!mt-2 rounded-full border border-gray-300 bg-gray-300 p-2 text-black transition-colors duration-200 hover:bg-gray-400"
            >
              cancel
            </button>
          </div>
        </div>
      </dialog>
      <dialog
        ref={blockerRef}
        onCancel={handleBlockerReset}
        className="m-auto w-full max-w-sm rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
      >
        <p>You have unchanged saved. Do you want to leave?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => handleBlockerProcess()}
            className="rounded-full border bg-red-500 px-4 py-2 text-white"
          >
            Leave
          </button>
          <button
            onClick={() => {
              handleBlockerReset();
            }}
            className="rounded-full border border-gray-300 bg-gray-300 p-2"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};

export default EditTodoModal;
