import express from 'express';
// Import the specific functions from your controller file
import { registerUser, loginUser } from '../controllers/userController.js'; 

const router = express.Router();

// Define the paths relative to the base /api/users
// POST /api/users/register calls registerUser
router.post('/register', registerUser);

// POST /api/users/login calls loginUser
router.post('/login', loginUser);

export default router;
