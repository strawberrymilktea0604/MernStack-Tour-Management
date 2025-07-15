import express from 'express';
import { createTour, updateTour, deleteTour, getSingleTour, getAllTour, getTourBySearch, getFeaturedTours, getTourCount } from '../controllers/tourController.js';

import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//create a new tour
router.post('/',verifyAdmin, createTour);

//update a new tour
router.put('/:id',verifyAdmin, updateTour);

//delete a tour
router.delete('/:id',verifyAdmin, deleteTour);

// get tours by search
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTours', getFeaturedTours);
router.get('/search/getTourCount', getTourCount);

//get a single tour
router.get('/:id', getSingleTour);

//get all tours
router.get('/', getAllTour);



export default router