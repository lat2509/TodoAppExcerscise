import { LuClipboardList } from 'react-icons/lu';
import { Link } from 'react-router';
import useAuthStore from '../stores/useAuthStore';
import { BsList } from 'react-icons/bs';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuthStore();

  const [onToggle, setOnToggle] = useState(false);

  const handleToggle = () => {
    setOnToggle(prev => !prev);
  }
  return (
    <div>
      <nav className="flex h-20 items-center justify-between bg-[#2c2c2c] p-4 text-lg text-white shadow-2xl">
        <div className="flex items-center justify-center px-8 py-4 text-2xl hover:cursor-pointer hover:text-blue-400">
          <LuClipboardList />
          <Link to="/">
            <p>TodoApp</p>
          </Link>
        </div>
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="px-8 py-4">
            <Link to="/" className="ml-4 text-xl hover:text-blue-400">
              Home
            </Link>
            <Link to="/todo" className="ml-4 text-xl hover:text-blue-400">
              Todo
            </Link>
          </div>
          <div className="mr-4 ml-auto px-8 py-4">
            {user ? (
              <div>
                <p>Hello {user.username}</p>
                <button
                  onClick={logout}
                  className="ml-4 rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="ml-4 rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button
            className='p-3'
            onClick={handleToggle}
          >
            <BsList />
          </button>
        </div>
      </nav>

      {onToggle && (
        <div className="items-center gap-2 flex flex-col bg-[#2c2c2c] p-4 text-white shadow-2xl md:hidden">
          <div className="flex flex-col p-2">
            <Link to="/" className="text-xl hover:text-blue-400">
              Home
            </Link>
            <Link to="/todo" className="text-xl hover:text-blue-400">
              Todo
            </Link>
          </div>
          <div>
            {user ? (
              <div>
                <p >Hello {user.username}</p>
                <button
                  onClick={logout}
                  className="rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                <Link
                  to="/login"
                  className="ml-4 rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
