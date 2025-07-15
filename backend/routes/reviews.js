
import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/:tourID", verifyToken, createReview);

export default router;