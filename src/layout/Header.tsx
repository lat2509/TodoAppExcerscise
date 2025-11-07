import { LuClipboardList } from 'react-icons/lu';
import { Link } from 'react-router';
import useAuthStore from '../stores/useAuthStore';
import { BsList } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuthStore();

  const [onToggle, setOnToggle] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const closeMenuOnResize = () => {
    setOnToggle(false);
    setShowUserMenu(false);
  }

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, [])

  const handleShowUserMenu = () => {
    setShowUserMenu(prev => !prev);
  }

  const handleToggle = () => {
    setOnToggle(prev => !prev);
  };
  return (
    <div>
      <nav className="flex h-14 items-center justify-between bg-gray-900 border-b border-gray-700 p-4 text-lg text-white shadow-2xl">
        <div className="flex items-center justify-center px-8 py-4 text-2xl hover:cursor-pointer hover:text-blue-400">
          <Link to="/" className='flex items-center justify-center gap-1'>
            <LuClipboardList />
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
          <div className="mr-2 ml-auto">
            {user ? (
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <button
                    onClick={handleShowUserMenu}
                    className='p-2 hover:cursor-pointer hover:bg-gray-600 hover:rounded-md'
                  >
                    <FaRegUserCircle className='text-xl' />
                  </button>
                </div>
                {showUserMenu &&
                  <div className='absolute top-14 right-1 p-3 text-black bg-white rounded-xl w-72 h-fit flex flex-col'>
                    <div className='flex flex-col p-3 border-b-1 border-gray-500/60'>
                      <span className='text-gray-600 py-2 text-sm'>ACCOUNT</span>
                      <div className='flex w-full items-center py-2 gap-3'>
                        <div className=''>
                          <FaRegUserCircle className='text-3xl' />
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-2xl'>{user.username}</span>
                          <p className='text-gray-500 text-sm'>{`${user.username}@gmail.com`}</p>
                        </div>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <button
                        onClick={logout}
                        className="w-full rounded-lg flex items-start px-3 py-1 text-gray-600 hover:bg-gray-200 hover:cursor-pointer"
                      >
                        Log out
                      </button>
                    </div>
                  </div>}
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
          <button className="p-3" onClick={handleToggle}>
            <BsList />
          </button>
        </div>
      </nav>

      {onToggle && (
        <div className="flex ml-auto w-1/2 rounded-xs flex-col items-center gap-2 bg-[#2c2c2c] p-4 text-white shadow-2xl md:hidden">
          <div className="flex flex-col p-2">
            <Link
              to="/"
              onClick={handleToggle}
              className="text-xl hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/todo"
              onClick={handleToggle}
              className="text-xl hover:text-blue-400"
            >
              Todo
            </Link>
          </div>
          <div>
            {user ? (
              <div className="flex flex-col items-center gap-3">
                <div className='flex items-center gap-1'>
                  <FaRegUserCircle />
                  <p>{user.username}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    handleToggle();
                  }}
                  className="rounded-4xl border px-4 py-1 hover:text-blue-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
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
