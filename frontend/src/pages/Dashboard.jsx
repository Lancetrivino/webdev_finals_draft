import { useEffect, useState } from "react";

function Dashboard() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("❌ Cannot connect to backend"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Dashboard</h2>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

export default Dashboard;
