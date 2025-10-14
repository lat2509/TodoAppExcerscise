
import Column from './column'
import type { TaskProps } from './types'
const Task: React.FC<TaskProps> = ({
    columns,
    todos,
    todo,
    showInput,
    setTodo,
    handleAddTodo,
    handleHideInput,
    handleShowInput,
    handleDeleteTodo,
}) => {
    return (
        <div className='flex flex-row justify-around w-full'>
            {columns.map((col) => (
                <div
                    key={col.name}
                    className="border rounded-lg p-2 w-50 h-auto bg-[rgba(255,255,255,0.7)] flex flex-col gap-3">
                    <p>{col.name}</p>
                    <Column
                        col={col}
                        todos={todos}
                        handleDeleteTodo={handleDeleteTodo}
                    />
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

export default Task