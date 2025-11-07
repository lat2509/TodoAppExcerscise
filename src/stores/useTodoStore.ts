import { create } from "zustand";
import type { SortConfigs, TaskProps, TodoStatus } from "../type/todo";
import { persist } from "zustand/middleware";

const defaultSortConfigs: Record<TodoStatus, SortConfigs> = {
  TODO: { sortBy: "createdAt", sortOrder: "desc" },
  IN_PROGRESS: { sortBy: "createdAt", sortOrder: "desc" },
  IN_REVIEW: { sortBy: "createdAt", sortOrder: "desc" },
  IN_DEPLOYMENT: { sortBy: "createdAt", sortOrder: "desc" },
  IN_TESTING: { sortBy: "createdAt", sortOrder: "desc" },
  DONE: { sortBy: "createdAt", sortOrder: "desc" },
}

const useTodoStore = create<TaskProps>()(
  persist(
    (set) => ({
      sortConfigs: defaultSortConfigs,
      onSortChange: (status, sortBy, sortOrder) =>
        set((state) => ({
          sortConfigs: {
            ...state.sortConfigs,
            [status]: { sortBy, sortOrder }
          }
        }))
    }),
    {
      name: "TodoSort"
    }
  )
)

export default useTodoStore;