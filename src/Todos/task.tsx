import { useTodoStore } from "../stores/useTodoStore";
import Column from "./column";

const columns = [
    { name: "Todo" },
    { name: "In Progress" },
    { name: "In Review" },
    { name: "Deploy" },
    { name: "In Testing" },
    { name: "Verify" },
    { name: "Done" },
];

const Task = () => {
    const {
        todo,
        showInput,
        setTodo,
        handleShowInput,
        handleAddTodo,
        handleHideInput,
    } = useTodoStore();

    return (
        <div className="flex flex-row justify-around w-full">
            {columns.map((col) => (
                <div
                    key={col.name}
                    className="border rounded-lg p-2 w-60 h-auto bg-[rgba(255,255,255,0.7)] flex flex-col gap-3"
                >
                    <p className="font-semibold">{col.name}</p>

                    <Column
                        col={col}
                    />

                    {showInput === col.name ? (
                        <div>
                            <input
                                type="text"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                autoFocus
                                className="border-black border rounded-full py-2 w-full px-3 mb-2"
                            />
                            <button
                                onClick={() => {
                                    handleAddTodo(col.name);
                                    handleHideInput();
                                }}
                                className="border rounded-full py-2 px-4 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200 !mt-1 !ml-5"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => handleHideInput()}
                                className="border rounded-full py-2 px-4 bg-gray-300 text-black hover:bg-gray-400 transition-colors duration-200 !ml-2.5 !mt-1"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleShowInput(col.name)}
                            className="border rounded-full p-2 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200"
                        >
                            Add New
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Task;
