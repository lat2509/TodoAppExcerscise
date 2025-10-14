import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Todo, Column } from "./types";
import Task from "./task";


const TodoPages = () => {

    const [showInput, setShowInput] = useState<string | null>(null);
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState<Todo[]>(() => {
        const data = localStorage.getItem("todos") ?? "[]";
        return JSON.parse(data) as Todo[];
    });

    const [columns, setColumns] = useState<Column[]>([
        { name: "Todo" },
        { name: "In Progress" },
        { name: "In Review" },
        { name: "Deploy" },
        { name: "In Testing" },
        { name: "Verify" },
        { name: "Done" },
    ])


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const handleShowInput = (col: string) => {
        setShowInput((prev) => prev === col ? null : col);
    }

    const handleHideInput = () => setShowInput(null);

    const handleAddTodo = (col: string) => {
        if (!todo.trim()) return;
        const newJob: Todo = {
            id: Date.now(),
            text: todo,
            status: col.toLowerCase(),
        }
        setTodos((prev) => [...prev, newJob]);
    }


    const handleDeleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((j) => j.id !== id));
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over) return;
        const activeId = Number(active.id);
        const overId = over.id as string;

        setTodos((prev) => prev.map((j) => j.id === activeId ? { ...j, status: overId.toLowerCase() } : j));
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row justify-around w-full">
                <Task
                    columns={columns}
                    todos={todos}
                    todo={todo}
                    showInput={showInput}
                    setTodo={setTodo}
                    handleAddTodo={handleAddTodo}
                    handleHideInput={handleHideInput}
                    handleShowInput={handleShowInput}
                    handleDeleteTodo={handleDeleteTodo}
                />
            </div>
        </DndContext>
    )
}

export default TodoPages;