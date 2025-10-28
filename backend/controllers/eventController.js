import Event from "../models/Event.js";

// 📍 Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
};

// 📍 Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;

    if (!title || !description || !date || !venue) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "✅ Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({ message: "Failed to create event", error: error.message });
  }
};

// 📍 Update an event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Only the creator or an Admin can update
    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.status(200).json({
      message: "✅ Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res
      .status(500)
      .json({ message: "Failed to update event", error: error.message });
  }
};

// 📍 Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Only the creator or an Admin can delete
    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "✅ Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
};
