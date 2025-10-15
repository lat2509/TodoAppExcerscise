import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Task from "./task";
import { useTodoStore } from "../stores/useTodoStore";

const TodoPages = () => {
    const updateTodoStatus = useTodoStore((s) => s.updateTodoStatus);
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return;
        updateTodoStatus(Number(active.id), over.id as string)
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row justify-around w-full">
                <Task />
            </div>
        </DndContext>
    )
}

export default TodoPages;