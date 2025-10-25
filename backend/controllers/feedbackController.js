import Feedback from "../models/Feedback.js";

export const addFeedback = async (req, res) => {
  const { eventId, rating, comment } = req.body;
  const feedback = await Feedback.create({
    eventId,
    userId: req.user._id,
    rating,
    comment,
  });
  res.status(201).json(feedback);
};
