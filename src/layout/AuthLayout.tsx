import 'normalize.css';
import { Outlet } from 'react-router-dom';
import '../App.css';

function AuthLayout() {
  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-[url('/todo-bg.jpg')] bg-cover bg-no-repeat">
      <Outlet />
    </div>
  );
}
export default AuthLayout;
