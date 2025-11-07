import Column from './Column';
import { Outlet, useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { type TaskProps, type TodoStatus } from '../../type/todo';
import ListAction from './ListAction';

const columns: { id: TodoStatus }[] = [
  { id: "TODO" },
  { id: "IN_PROGRESS" },
  { id: "IN_REVIEW" },
  { id: "IN_DEPLOYMENT" },
  { id: "IN_TESTING" },
  { id: "DONE" },
];

const Task: React.FC<TaskProps> = ({ sortConfigs, onSortChange }) => {
  const navigator = useNavigate();

  return (
    <div className="mt-14 flex w-full flex-col items-center justify-around gap-2 md:flex-row md:items-start">
      {columns.map(col => (
        <div
          key={col.id}
          className="relative flex min-w-72 flex-col gap-3 shadow-md rounded-lg bg-[#f1f2f4] p-2 md:h-auto"
        >
          <ListAction col={col} onSortChange={onSortChange} />
          <Column col={col} sortConfigs={sortConfigs[col.id]} />
          <button
            onClick={() => {
              navigator('addNewtodo');
            }}
            className="p-2 flex gap-2 text-gray-600 hover:bg-gray-200 rounded-lg w-full"
          >
            <FiPlus />
            Add new todo
          </button>
        </div>
      ))}
      <Outlet />
    </div>
  );
};

export default Task;
