import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js'; 
import { createEvent, getEvents, approveEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();
router.route('/').get(protect, getEvents).post(protect, createEvent);

router.put('/:id/approve', protect, admin, approveEvent);

router.route('/:id')
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

export default router;