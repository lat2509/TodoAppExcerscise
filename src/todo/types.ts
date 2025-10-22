export interface TodoApi {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  status: string;
}

export interface Column {
  name: string;
}

export interface ColumnProps {
  col: Column;
}

export interface DragTodoProps {
  todo: TodoApi;
}

export interface UserData {
  email: string;
  password: string;
}

export interface TodoState {
  todos: TodoApi[];
  showInput: string | null;
  showEdit: number | null;
  handleShowInput: (col: string) => void;
  handleAddTodo: (text: string, col: string) => void;
  handleDeleteTodo: (id: number) => void;
  handleHideInput: () => void;
  updateTodoStatus: (id: number, status: string) => void;
  updateTodoText: (id: number, text: string) => Promise<void>;
  fetchTodo: () => void;
}
