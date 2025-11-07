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
  id: TodoStatus;
}


export interface ColumnComponentProps {
  col: Column,
  sortConfigs: SortConfigs,
}

export interface DragTodoProps {
  todo: TodoApi;
}

export interface TodoFormModalProps {
  initialData?: TodoApi;
  onSubmitApi: (data: NewTodo) => Promise<void>;
  onSuccess: () => void;
}

export interface TaskProps {
  sortConfigs: Record<TodoStatus, SortConfigs>;
  onSortChange: (status: TodoStatus, sortBy: string, sortOrder: string) => void;
}

export type TodoStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "IN_DEPLOYMENT"
  | "IN_TESTING"
  | "DONE";

export interface ListActionComponentProp {
  col: { id: TodoStatus },
  onSortChange: (status: TodoStatus, sortBy: string, sortOrder: string) => void;
}

export interface SortConfigs {
  sortBy: string
  sortOrder: string
}