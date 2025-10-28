import { useEffect, useState } from "react";

function Dashboard() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // ✅ Fetch from backend
    const fetchData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) throw new Error("Failed to fetch backend data.");

        const data = await response.text(); // or response.json() if your backend returns JSON
        setMessage(data || "✅ Connected to backend successfully!");
      } catch (error) {
        console.error("Error:", error);
        setMessage("❌ Cannot connect to backend. Check API URL and CORS.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Dashboard</h2>

        {user && (
          <div className="mb-4 text-gray-700">
            <p>
              <strong>Welcome:</strong> {user.name}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
          </div>
        )}

        <div className="p-4 border rounded-lg bg-gray-50 mb-4">
          <p className="text-md font-medium">
            {loading ? "Loading..." : message}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
