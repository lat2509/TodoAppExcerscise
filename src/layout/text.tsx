import { useState } from 'react';
import { LuClipboardList, LuMenu, LuX } from 'react-icons/lu';
import { Link } from 'react-router-dom'; // 💡 Sửa: react-router-dom
import useAuthStore from '../stores/useAuthStore';

const Header = () => {
  const { user, logout } = useAuthStore();
  // 1. Thêm state để quản lý menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // 2. Tạo một hàm logout đầy đủ (theo logic ta đã bàn)
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Xóa user khỏi Zustand
    logout();
    // Đóng menu (nếu đang mở)
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  // 3. Hàm để đóng menu khi click vào link
  const handleLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    // Thẻ div bọc ngoài cùng
    <div>
      <nav className="flex h-20 items-center justify-between bg-[#2c2c2c] p-4 text-white shadow-2xl">
        {/* === Logo/Brand === */}
        <Link
          to="/"
          className="flex items-center gap-2 px-8 py-4 text-2xl hover:cursor-pointer hover:text-blue-400"
          onClick={handleLinkClick}
        >
          <LuClipboardList />
          <p>TodoApp</p>
        </Link>

        {/* === Desktop Navigation === */}
        {/* 4. Thêm 'hidden md:flex' để ẩn trên mobile và hiện trên desktop */}
        <div className="hidden items-center md:flex">
          {/* Nav Links */}
          <div className="px-8 py-4">
            <Link to="/" className="ml-4 text-xl hover:text-blue-400">
              Home
            </Link>
            <Link to="/todo" className="ml-4 text-xl hover:text-blue-400">
              Todo
            </Link>
          </div>

          {/* Auth Links */}
          <div className="mr-4 px-8 py-4">
            {user ? (
              <div className="flex items-center gap-4">
                <p>Hello {user.firstName}</p>
                <button
                  onClick={handleLogout}
                  // 💡 Sửa: rounded-4xl không chuẩn Tailwind, dùng rounded-lg
                  className="ml-4 rounded-lg border px-4 py-1 hover:text-blue-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="ml-4 rounded-lg border px-4 py-1 hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 rounded-lg border px-4 py-1 hover:text-blue-400"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* === Mobile Menu Button === */}
        {/* 5. Nút Hamburger: Chỉ hiện trên mobile (md:hidden) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 hover:bg-gray-700"
          >
            {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* === Mobile Dropdown Menu === */}
      {/* 6. Menu này chỉ hiện khi isMenuOpen = true và trên mobile (md:hidden) */}
      {isMenuOpen && (
        <div className="bg-[#2c2c2c] p-4 text-white shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {/* Mobile Nav Links */}
            <Link
              to="/"
              className="rounded-md px-4 py-2 text-xl hover:text-blue-400"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/todo"
              className="rounded-md px-4 py-2 text-xl hover:text-blue-400"
              onClick={handleLinkClick}
            >
              Todo
            </Link>

            <hr className="border-gray-600" />

            {/* Mobile Auth Links */}
            {user ? (
              <div className="flex flex-col items-start gap-4 px-4">
                <p>Hello {user.firstName}</p>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg border px-4 py-1 text-left hover:text-blue-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="rounded-lg border px-4 py-1 text-center hover:text-blue-400"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg border px-4 py-1 text-center hover:text-blue-400"
                  onClick={handleLinkClick}
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
