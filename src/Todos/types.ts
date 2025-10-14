export type Todo = {
    id: number,
    text: string;
    status: string;
}

export interface Column {
    name: string;
}

export interface TaskProps {
    columns: Column[];
    todos: Todo[];
    todo: string;
    showInput: string | null;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAddTodo: (col: string) => void;
    handleHideInput: () => void;
    handleShowInput: (col: string) => void;
    handleDeleteTodo: (id: number) => void;
}

export interface ColumnProps {
    col: Column;
    todos: Todo[];
    handleDeleteTodo: (id: number) => void;
}

export interface DragTodoProps {
    id: number;
    text: string;
    handleDeleteTodo: (id: number) => void;
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