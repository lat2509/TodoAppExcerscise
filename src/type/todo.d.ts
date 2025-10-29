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

export interface NewTodo {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  assignee: string;
  priority: string;
  status: string;
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
  handleAddTodo: (dataPost: NewTodo) => Promise<void>;
  handleDeleteTodo: (id: string) => Promise<void>;
  updateTodoStatus: (id: string, status: string) => Promise<void>;
  updateTodo: (id: string, data: NewTodo) => Promise<void>;
  fetchTodo: () => void;
}

export interface TodoFormModalProps {
  initialData?: TodoApi;
  onSubmitApi: (data: NewTodo) => Promise<void>;
  onSuccess: () => void;
}
