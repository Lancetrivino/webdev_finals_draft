import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to ensure localStorage check runs client-side

  useEffect(() => {
    // Check for client environment before accessing window/localStorage
    setIsClient(true);
    
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to home page after clearing storage
    window.location.href = "/";
  };

  // Main navigation links based on authentication status
  const NavLinks = () => {
    if (!isClient) return null; // Avoid rendering links until client-side check is done

    if (isAuthenticated) {
      return (
        <>
          <a href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition duration-150">
            Dashboard
          </a>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <div className="flex space-x-4">
          <a href="/login" className="text-gray-700 hover:text-green-600 font-medium transition duration-150">
            Login
          </a>
          <a href="/register" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150">
            Register
          </a>
        </div>
      );
    }
  };

  // Determine the link destination and text for the main center button
  const mainLinkPath = isAuthenticated ? "/dashboard" : "/login";
  const mainLinkText = isAuthenticated ? "Go to Dashboard" : "Get Started";

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-2xl font-extrabold text-green-600">
              Eventure
            </a>
            <div className="flex items-center space-x-4">
              <NavLinks />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-green-600">Eventure</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Manage and join school events effortlessly. Eventure connects administrators and participants in one seamless platform.
        </p>
        
        {/* Main Action Button */}
        <a
          href={mainLinkPath}
          className="px-8 py-4 text-xl font-semibold bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          {mainLinkText}
        </a>
      </div>
    </div>
  );
}
