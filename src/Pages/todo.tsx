import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

const Todo = () => {
    type Todo = {
        id: number,
        text: string;
        status: string;
    }

    interface Column {
        name: string;
    }

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

    return (
        <div className="flex flex-row justify-around w-full">
            {columns.map((col) => (
                <div
                    key={col.name}
                    className="border rounded-lg p-2 w-50 h-auto bg-[rgba(255,255,255,0.7)] flex flex-col gap-3">
                    <p>{col.name}</p>
                    {todos
                        .filter((todo) => todo.status.toLowerCase() === col.name.toLowerCase())
                        .map((todo) => (
                            <ul key={todo.id} className="relative">
                                <li className="border rounded-lg p-2 flex justify-between items-center hover:cursor-pointer hover:border-cyan-400">
                                    <span className="overflow-hidden">{todo.text}</span>
                                    <div className="flex gap-1">
                                        <button className="hover:text-blue-400"><FiEdit /></button>
                                        <button onClick={() => handleDeleteTodo(todo.id)} className="hover:text-red-600">
                                            <TiDeleteOutline className="text-2xl" />
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        ))}
                    {showInput === col.name ? (
                        <div>
                            <input
                                id="todo"
                                type="text"
                                onChange={(e) => { setTodo(e.target.value) }}
                                autoFocus
                                className="border-black border rounded-full py-2 w-full px-3 mb-2" />
                            <button
                                onClick={() => { handleAddTodo(col.name), handleHideInput() }}
                                className="border rounded-full py-2 px-4 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200 !mt-1 !ml-3">
                                save
                            </button>
                            <button
                                onClick={() => { handleHideInput() }}
                                className="border rounded-full py-2 px-4 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200 !ml-2.5 !mt-1">
                                cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleShowInput(col.name)}
                            className="border rounded-full p-2 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200">
                            Add New
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Todo;