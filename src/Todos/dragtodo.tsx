import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { useDraggable } from "@dnd-kit/core";
import type { DragTodoProps } from "./types";
import { useTodoStore } from "../stores/useTodoStore";
const DraggableTodo: React.FC<DragTodoProps> = ({ todo }) => {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({ id: todo.id.toString() });

    const {
        showEdit,
        editText,
        setEditText,
        handleDeleteTodo,
        handleShowEdit,
        handleCancelEdit,
        updateTodoText,
    } = useTodoStore();

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined
    };

    return (
        <ul ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <li className="border rounded-lg p-2 flex justify-between items-center hover:cursor-grab hover:border-cyan-400 bg-white shadow-sm">
                <span className="overflow-hidden">{todo.text}</span>
                <div className="flex gap-1">
                    {showEdit === todo.id ? (
                        <div className="flex flex-col p-2 w-[150px]">
                            <input
                                id="todo"
                                type="text"
                                value={editText}
                                onChange={(e) => { setEditText(e.target.value) }}
                                autoFocus
                                className="border-black border rounded-full py-2 w-full px-3 mb-2" />
                            <button
                                onPointerDown={(e) => { e.stopPropagation() }}

                                onClick={() => { handleCancelEdit(), updateTodoText(todo.id) }}
                                className="border rounded-full py-2 px-4 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200 !mt-1 !ml-3">
                                save
                            </button>
                            <button
                                onPointerDown={(e) => { e.stopPropagation() }}

                                onClick={() => { handleCancelEdit() }}
                                className="border rounded-full py-2 px-4 bg-gray-300 text-black hover:bg-gray-400 transition-colors duration-200 !ml-2.5 !mt-1"
                            >
                                cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onPointerDown={(e) => { e.stopPropagation() }}
                            onClick={() => { handleShowEdit(todo.id) }}
                            className="hover:text-blue-400"
                        >
                            <FiEdit />
                        </button>
                    )}

                    <button
                        onPointerDownCapture={(e) => { e.stopPropagation() }}
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="hover:text-red-600"
                    >
                        <TiDeleteOutline className="text-2xl" />
                    </button>
                </div>
            </li>
        </ul>
    );
};

export default DraggableTodo;