import Tour from '../models/Tour.js';


// Create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Successfully created ",
            data: savedTour});
    } catch (err) {
        res.status(500).json({
            success: false ,
            message: "Failed to create. Try again ",
        });
    }
}

//update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour});
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
}

//delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted"});
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
}

//get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews')
        res.status(200).json({success: true,
            message: "Successfully fetched",
            data: tour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "not found",
        });
    }
}

//get all tours
export const getAllTour = async (req, res) => {

    //for pagination
    const page = parseInt(req.query.page);
    console.log(page);
    try {
        const tours = await Tour.find({})
        .populate('reviews')
        .skip(page * 8)
        .limit(8);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successfully fetched all tours",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "not found",
        });
    }
}

// get tour by search
export const getTourBySearch = async (req, res) => {

// here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {

        // gte means greater than equal
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        }).populate('reviews');
        res.status(200).json({
            success: true,
            message: "Successfully ",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "not found",
        });
    }
}

//get featured tours
export const getFeaturedTours = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
        res.status(200).json({
            success: true,
            message: "Successfully fetched featured tours",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch featured tours",
        });
    }
}

// get tour counts
export const getTourCount = async (req, res) => {
    try {
        const TourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            data: TourCount,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch ",
        });
    }
}