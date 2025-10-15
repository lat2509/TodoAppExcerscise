import { LuClipboardList } from "react-icons/lu";
import { Link } from "react-router";
import UseAuthStore from "../stores/useAuthStore";
const Header = () => {
    const { user, logout } = UseAuthStore();
    const userLogin = JSON.parse(localStorage.getItem("userEmail") || "[]");
    return (
        <div className="">
            <nav className="p-4 flex h-20 items-center text-lg bg-[#2c2c2c] text-white shadow-2xl " >
                <div className="flex items-center justify-center px-8 py-4 hover:cursor-pointer hover:text-blue-400 text-2xl">
                    <LuClipboardList />
                    <Link to="/">
                        <p>TodoApp</p>
                    </Link>
                </div>
                <div className="px-8 py-4">
                    <Link to="/" className="ml-4 hover:text-blue-400 text-xl">Home</Link>
                    <Link to="/todo" className="ml-4 hover:text-blue-400 text-xl">Todo</Link>

                </div>
                <div className="ml-auto mr-4 px-8 py-4">
                    {user ? (
                        <div>
                            <p>Hello {userLogin[0].userName}</p>
                            <button onClick={logout} className="ml-4 border rounded-4xl py-1 px-4  hover:text-blue-400">Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="ml-4 border rounded-4xl py-1 px-4  hover:text-blue-400">Login</Link>
                            <Link to="/register" className="ml-4 border rounded-4xl py-1 px-4  hover:text-blue-400">Sign Up</Link>
                        </div>
                    )}

                </div>
            </nav>
        </div>
    )
}

export default Header;
