import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("createdBy", "name email");
  res.json(events);
};

export const createEvent = async (req, res) => {
  const { title, description, date, venue } = req.body;
  const event = await Event.create({ title, description, date, venue, createdBy: req.user._id });
  res.status(201).json(event);
};

export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "Admin")
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(event, req.body);
  await event.save();
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "Admin")
    return res.status(403).json({ message: "Not authorized" });

  await event.deleteOne();
  res.json({ message: "Event removed" });
};
