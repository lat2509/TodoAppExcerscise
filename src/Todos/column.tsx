// src/Column.tsx
import { useDroppable } from "@dnd-kit/core";
import type { ColumnProps } from "./types";
import DraggableTodo from "./dragtodo";

const Column: React.FC<ColumnProps> = ({ col, todos, showEdit, editText, setEditText, handleDeleteTodo, handleCancelEdit, handleShowEdit, updateTodoText }) => {
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
                        showEdit={showEdit}
                        editText={editText}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCancelEdit={handleCancelEdit}
                        setEditText={setEditText}
                        updateTodoText={updateTodoText}
                        handleShowEdit={handleShowEdit}
                    />
                ))}
        </div>
    );
};


export default Column;
