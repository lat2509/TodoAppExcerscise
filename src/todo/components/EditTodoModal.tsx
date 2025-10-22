import { useRef, useEffect, useState } from "react";
import { useTodoStore } from "../../stores/useTodoStore";
import { useNavigate, useParams, useBlocker, useLoaderData } from "react-router-dom";
import type { TodoApi } from "../types";
import { TiDeleteOutline } from "react-icons/ti";
const EditTodoModal = () => {
  const { todoId } = useParams();

  const navigator = useNavigate();

  const updateTodoText = useTodoStore(state => state.updateTodoText);

  const todo = useLoaderData() as TodoApi;

  const [editText, setEditText] = useState(todo.todo);

  const [isDirty, setIsDirty] = useState(false);


  const blocker = useBlocker(isDirty);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const blockerRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    };
  }, [])

  useEffect(() => {
    const blockerDialog = blockerRef.current;
    if (!blockerDialog) return;
    if (blocker.state === "blocked" && !blockerDialog.open) {
      blockerDialog.showModal();
    }

    if (blocker.state === 'unblocked' && blockerDialog.open) {
      blockerDialog.close();
    }
  }, [blocker.state])

  const handleBlockerProcess = () => {
    blockerRef.current?.close();
    blocker.proceed?.();
  }

  const handleBlockerReset = () => {
    blockerRef.current?.close();
    blocker.reset?.();
  }
  const handleOnOffModel = () => {
    navigator("/todo");
  }

  const handleSave = async () => {
    if (!editText.trim()) {
      setEditText(todo.todo);
      return;
    }
    setIsDirty(false);
    try {
      await updateTodoText(todo.id, editText);
      handleOnOffModel();
    } catch (error) {
      console.error("Failed to update", error);
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
        className="p-6 bg-white rounded-lg shadow-xl w-full max-w-sm backdrop:bg-black/50 m-auto"
      >
        <div className="flex justify-between">
          <p className="p-3 text-2xl">Update Todo</p>
          <button
            onClick={() => { handleOnOffModel() }}
            className="hover:text-red-600"
          >
            <TiDeleteOutline className="text-2xl mr-3" />
          </button>
        </div>

        <div className="flex flex-col w-full p-2 justify-center">
          <input
            id={editText}
            type="text"
            value={editText}
            onChange={e => {
              setEditText(e.target.value);
              setIsDirty(todo.todo !== editText);
            }}
            autoFocus
            onKeyDown={e => e.stopPropagation()}
            className="border-black border rounded-full py-2 px-3 mb-2"
          />
          <div className="flex justify-around w-full">
            <button
              onPointerDown={e => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleSave();
              }}
              className="border rounded-full py-2 px-4 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200 !mt-2"
            >
              save
            </button>
            <button
              onPointerDown={e => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleOnOffModel()
              }}
              className="border border-gray-300 rounded-full p-2 bg-gray-300 text-black hover:bg-gray-400 transition-colors duration-200 !mt-2"
            >
              cancel
            </button>
          </div>
        </div>
      </dialog>
      <dialog
        ref={blockerRef}
        onCancel={handleBlockerReset}
        className="p-6 bg-white rounded-lg shadow-xl w-full max-w-sm backdrop:bg-black/50 m-auto"
      >
        <p>Bạn có chắc chắn muốn rời đi?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => handleBlockerProcess()}
            className="border rounded-full py-2 px-4 bg-red-500 text-white"
          >
            Leave
          </button>
          <button
            onClick={() => { handleBlockerReset() }}
            className="border border-gray-300 rounded-full p-2 bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  )
}

export default EditTodoModal