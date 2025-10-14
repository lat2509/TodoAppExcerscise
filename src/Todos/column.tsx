// src/Column.tsx
import { useDroppable } from "@dnd-kit/core";
import type { ColumnProps } from "./types";
import DraggableTodo from "./dragtodo";
const Column: React.FC<ColumnProps> = ({ col, todos, handleDeleteTodo }) => {
    const { setNodeRef } = useDroppable({ id: col.name });

    return (
        <div ref={setNodeRef} className="flex flex-col gap-3 min-h-96">
            {todos
                .filter(
                    (todo) => todo.status.toLowerCase() === col.name.toLowerCase()
                )
                .map((todo) => (
                    <DraggableTodo
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                ))}
        </div>
    );
};


export default Column;
