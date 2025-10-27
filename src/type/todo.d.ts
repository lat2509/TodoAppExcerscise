export interface TodoApi {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

export interface Column {
  id: string;
  title: string;
}

export interface ColumnProps {
  col: Column;
}

export interface DragTodoProps {
  todo: TodoApi;
}

export interface TodoState {
  todos: TodoApi[];
  handleAddTodo: (text: string, col: string) => void;
  handleDeleteTodo: (id: string) => void;
  updateTodoStatus: (id: string, status: string) => void;
  updateTodoText: (id: string, text: string) => Promise<void>;
  fetchTodo: () => void;
}
