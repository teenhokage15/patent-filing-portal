import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-red-800 text-white px-6 py-4 flex justify-between items-center shadow">
  <div>
    <h1 className="text-xl font-bold">University Institute of Computing</h1>
    <p className="text-xs text-red-200">
      Patent Filing & Management Portal
    </p>
  </div>

  <div className="space-x-4 flex items-center">
    {!user ? (
      <>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </>
    ) : (
      <>
        <span className="hidden md:inline">Hi, {user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </>
    )}
  </div>
</nav>

  );
};

export default Navbar;
