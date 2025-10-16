// src/Column.tsx
import { useDroppable } from "@dnd-kit/core";
import type { ColumnProps } from "./types";
import DraggableTodo from "./dragtodo";
import { useTodoStore } from "../stores/useTodoStore";

const Column: React.FC<ColumnProps> = ({ col }) => {
    const { setNodeRef } = useDroppable({ id: col.name });

    const todos = useTodoStore((state) => state.todos);
    return (
        <div ref={setNodeRef} className="flex flex-col gap-3 min-h-96">
            {todos
                .filter(
                    (todo) => todo.status.toLowerCase() === col.name.toLowerCase()
                )
                .map((todo) => (
                    <DraggableTodo
                        key={todo.id}
                        todo={todo}
                    />
                ))}
        </div>
    );
};


export default Column;
