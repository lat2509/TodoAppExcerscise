import 'normalize.css';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const hideHeaderOn = ['/login', '/register'];
  const showHeader = !hideHeaderOn.includes(location.pathname);
  return (
    <div className="">
      {showHeader && (
        <div className="fixed top-0 right-0 left-0 z-10">
          <Header />
        </div>
      )}
      <div className="absolute top-0 flex h-full w-full items-center justify-center bg-[url('/todo-bg.jpg')] bg-cover bg-no-repeat p-4">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
