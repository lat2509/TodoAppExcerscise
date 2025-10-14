import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { useDraggable } from "@dnd-kit/core";
import type { DragTodoProps } from "./types";
const DraggableTodo: React.FC<DragTodoProps> = ({
    id,
    text,
    handleDeleteTodo,
}) => {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({ id: id.toString() });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined
    };

    return (
        <ul ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <li className="border rounded-lg p-2 flex justify-between items-center hover:cursor-grab hover:border-cyan-400 bg-white shadow-sm">
                <span className="overflow-hidden">{text}</span>
                <div className="flex gap-1">
                    <button
                        onPointerDown={(e) => { e.stopPropagation() }}
                        className="hover:text-blue-400">
                        <FiEdit />
                    </button>
                    <button
                        onPointerDownCapture={(e) => { e.stopPropagation() }}
                        onClick={() => handleDeleteTodo(id)}
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