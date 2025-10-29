import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-orange-700 tracking-wide hover:text-orange-800 transition"
        >
          Eventure
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/events"
            className="text-gray-700 font-medium hover:text-orange-700 transition"
          >
            Events
          </Link>

          {currentUser && (
            <Link
              to="/create-event"
              className="text-gray-700 font-medium hover:text-orange-700 transition"
            >
              Create Event
            </Link>
          )}

          {currentUser?.role === "Admin" && (
            <Link
              to="/admin"
              className="text-gray-700 font-medium hover:text-orange-700 transition"
            >
              Admin Dashboard
            </Link>
          )}

          {currentUser ? (
            <>
              <span className="text-gray-600 text-sm">
                Hello, <strong>{currentUser.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-orange-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 font-medium hover:text-orange-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 shadow-md">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              to="/events"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-orange-700 transition"
            >
              Events
            </Link>

            {currentUser && (
              <Link
                to="/create-event"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-orange-700 transition"
              >
                Create Event
              </Link>
            )}

            {currentUser?.role === "Admin" && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-orange-700 transition"
              >
                Admin Dashboard
              </Link>
            )}

            {currentUser ? (
              <>
                <span className="text-gray-600 text-sm">
                  Hello, <strong>{currentUser.name}</strong>
                </span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium hover:text-orange-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium hover:text-orange-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
