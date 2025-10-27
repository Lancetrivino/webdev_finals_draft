import { useEffect, useState } from "react";

function Dashboard() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL; // ✅ Use environment variable
        const token = localStorage.getItem("token"); // Optional: check if user is logged in

        const response = await fetch(`${API_BASE}/`, {
          headers: token
            ? { Authorization: `Bearer ${token}` } // If you have protected route
            : {},
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.error("Error:", error);
        setMessage("❌ Cannot connect to backend. Check API URL and CORS.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Dashboard</h2>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <p className="text-lg font-medium">
          {loading ? "Loading..." : message}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
