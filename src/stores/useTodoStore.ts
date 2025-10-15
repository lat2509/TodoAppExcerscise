import { create } from "zustand";
import type { Todo, TodoState } from "../Todos/types";


export const useTodoStore = create<TodoState>((set, get) => ({
    todos: JSON.parse(localStorage.getItem("todos") ?? "[]"),
    todo: "",
    showInput: null,
    showEdit: null,
    editText: "",
    setTodo: (val) => set({ todo: val }),
    setEditText: (val) => set({ editText: val }),
    handleShowInput: (col) =>
        set((state) => ({
            showInput: state.showInput === col ? null : col,
        })),
    handleHideInput: () => set({ showInput: null }),
    handleAddTodo: (col) => {
        const { todo, todos } = get();
        if (!todo.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: todo,
            status: col.toLowerCase(),
        };

        const updated = [...todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updated));
        set({ todos: updated, todo: "" });
    },

    handleDeleleTodo: (id) => {
        const filtered = get().todos.filter((t) => t.id !== id);
        localStorage.setItem("todos", JSON.stringify(filtered));
        set({ todos: filtered });
    },

    updateTodoStatus: (id, status) => {
        const updated = get().todos.map((t) =>
            t.id === id ? { ...t, status } : t
        );
        localStorage.setItem("todos", JSON.stringify(updated));
        set({ todos: updated });
    },

    handleShowEdit: (id) => {
        const todo = get().todos.find(s => s.id == id)
        set((state) => ({
            showEdit: state.showEdit === id ? null : id,
            editText: todo ? todo.text : "",
        }))
    },

    handleCancelEdit: () => {
        set({ showEdit: null });
    },
    updateTodoText: (id) => { // 🆕 cập nhật todo đã chỉnh sửa
        const { todos, editText } = get();
        const updated = todos.map((t) =>
            t.id === id ? { ...t, text: editText } : t
        );
        localStorage.setItem("todos", JSON.stringify(updated));
        set({ todos: updated, showEdit: null, editText: "" });
    },
}));
