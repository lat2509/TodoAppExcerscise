import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Task from "./task";
import { useTodoStore } from "../stores/useTodoStore";

const TodoPages = () => {
    const updateTodoStatus = useTodoStore((state) => state.updateTodoStatus);
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return;
        updateTodoStatus(Number(active.id), over.id as string)
    }
    return (

        <div className="flex flex-row justify-around w-full overflow-hidden max-h-screen">
            <DndContext onDragEnd={handleDragEnd}>
                <Task />
            </DndContext>
        </div>

    )
}

export default TodoPages;