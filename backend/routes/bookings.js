import express from 'express';
import {
    createBooking,
    getBooking,
    getAllBooking
} from '../controllers/bookingController.js'; 

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBooking);

export default router;
