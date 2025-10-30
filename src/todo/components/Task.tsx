import Column from './Column';
import { Outlet, useNavigate } from 'react-router-dom';

const columns = [
  { id: 'Todo', title: 'Todo' },
  { id: 'In_Progress', title: 'In Progress' },
  { id: 'In_Review', title: 'In Review' },
  { id: 'In_Deployment', title: 'Deploy' },
  { id: 'In_Testing', title: 'In Testing' },
  { id: 'Done', title: 'Done' },
];

const Task = () => {
  const navigator = useNavigate();

  return (
    <div className="mt-24 flex w-full flex-col items-center justify-around gap-2 md:mt-20 md:flex-row">
      {columns.map(col => (
        <div
          key={col.id}
          className="flex min-w-60 flex-col gap-3 rounded-lg border bg-[rgba(255,255,255,0.7)] p-2 md:h-auto"
        >
          <p className="font-semibold">{col.title}</p>
          <Column col={col} />
          <button
            onClick={() => {
              navigator('addNewtodo');
            }}
            className="rounded-full border bg-cyan-400 p-2 text-white transition-colors duration-200 hover:bg-cyan-600"
          >
            Add New
          </button>
        </div>
      ))}
      <Outlet />
    </div>
  );
};

export default Task;
