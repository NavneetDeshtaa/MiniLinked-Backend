// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-extrabold text-indigo-600 tracking-tight">
          MiniLinkedIn
        </Link>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium text-gray-600">
          <span className="hover:text-indigo-600 transition cursor-pointer">Home</span>
          <span className="hover:text-indigo-600 transition cursor-pointer">Explore</span>
          <span className="hover:text-indigo-600 transition cursor-pointer">Jobs</span>
          <span className="hover:text-indigo-600 transition cursor-pointer">Messages</span>
          <span className="hover:text-indigo-600 transition cursor-pointer">Notifications</span>
        </div>

        {/* Auth Links / User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="text-gray-700 hover:text-indigo-600 transition text-lg"
              >
                My Profile
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 transition text-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
