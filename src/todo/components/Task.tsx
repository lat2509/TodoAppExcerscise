import Column from './Column';
import { Outlet, useNavigate } from 'react-router-dom';

const columns = [
  { id: 'Todo', title: "Todo" },
  { id: 'InProgress', title: "In Progress" },
  { id: 'InReview', title: "In Review" },
  { id: 'InDeployment', title: "Deploy" },
  { id: 'InTesting', title: "In Testing" },
  { id: 'Done', title: "Done" },
];

const Task = () => {
  const navigator = useNavigate();

  return (
    <div className="flex-col justify-center gap-2 items-center flex w-full md:flex-row md:justify-around">
      {columns.map(col => (
        <div
          key={col.id}
          className="flex h-auto w-60 flex-col gap-3 rounded-lg border bg-[rgba(255,255,255,0.7)] p-2"
        >
          <p className="font-semibold">{col.title}</p>
          <Column col={col} />
          <button
            onClick={() => {
              navigator("addNewtodo");
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
