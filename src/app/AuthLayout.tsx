import 'normalize.css';
import { Outlet } from 'react-router-dom';
import './App.css';

function AuthLayout() {
  return (
    <div className="flex items-center justify-center absolute h-full w-full bg-[url('/todo-bg.jpg')] bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
}
export default AuthLayout;
