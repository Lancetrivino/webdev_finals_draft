import { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE}/api/events`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = await response.json();

        if (response.ok) {
          setEvents(data);
        } else {
          setMessage("❌ " + (data.message || "Failed to fetch events."));
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("❌ Cannot connect to backend. Check API URL and CORS.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        All Events
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : message ? (
        <p className="text-center text-red-500">{message}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-700">No events available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-700 mb-1">
                📅 <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-1">
                📍 <strong>Venue:</strong> {event.venue}
              </p>
              <p className="text-gray-600 mb-3">{event.description}</p>

              <a
                href={`/events/${event._id}/feedback`}
                className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Give Feedback
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
