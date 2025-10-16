export type Todo = {
    id: number,
    text: string;
    status: string;
}

export interface Column {
    name: string;
}
export interface ColumnProps {
    col: Column;
}

export interface DragTodoProps {
    todo: Todo;
}

export interface AuthState {
    user: string | null;
    login: (email: string) => void;
    logout: () => void;
}

export interface UserData {
    email: string;
    password: string;
}

export interface TodoState {
    todos: Todo[],
    todo: string,
    editText: string,
    showInput: string | null,
    showEdit: number | null,
    setTodo: (val: string) => void,
    setEditText: (val: string) => void,
    handleShowInput: (col: string) => void,
    handleAddTodo: (col: string) => void,
    handleDeleteTodo: (id: number) => void,
    handleHideInput: () => void;
    updateTodoStatus: (id: number, status: string) => void,
    handleShowEdit: (id: number) => void,
    handleCancelEdit: () => void,
    updateTodoText: (id: number) => void,
}