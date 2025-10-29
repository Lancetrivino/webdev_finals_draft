import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔸 Hide NavBar on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  // 🔸 Consistent active link styling
  const navLinkStyle = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-orange-700 font-semibold"
        : "text-gray-700 hover:text-orange-700"
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        {/* 🔹 Logo */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-orange-700 tracking-wide hover:text-orange-800 transition"
        >
          Eventure
        </NavLink>

        {/* 🔹 Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/events" className={navLinkStyle}>
            Events
          </NavLink>

          {currentUser && (
            <>
              <NavLink to="/create-event" className={navLinkStyle}>
                Create Event
              </NavLink>

              <NavLink to="/feedback" className={navLinkStyle}>
                Feedback
              </NavLink>

              <NavLink to="/profile" className={navLinkStyle}>
                Profile
              </NavLink>
            </>
          )}

          {currentUser?.role === "Admin" && (
            <NavLink to="/admin" className={navLinkStyle}>
              Admin Dashboard
            </NavLink>
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
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* 🔹 Mobile Menu Button */}
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

      {/* 🔹 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 shadow-md animate-fadeIn">
          <div className="flex flex-col items-center gap-4 py-4">
            <NavLink
              to="/events"
              onClick={() => setMenuOpen(false)}
              className={navLinkStyle}
            >
              Events
            </NavLink>

            {currentUser && (
              <>
                <NavLink
                  to="/create-event"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle}
                >
                  Create Event
                </NavLink>
                <NavLink
                  to="/feedback"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle}
                >
                  Feedback
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle}
                >
                  Profile
                </NavLink>
              </>
            )}

            {currentUser?.role === "Admin" && (
              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                Admin Dashboard
              </NavLink>
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
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkStyle}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
