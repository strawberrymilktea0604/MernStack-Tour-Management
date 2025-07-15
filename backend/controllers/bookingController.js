
import Booking from '../models/Booking.js';

// create new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({
            success: true,
            message: "Successfully created booking",
            data: savedBooking
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create booking. Try again",
        });
    }
}

// get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Booking.findById(id);
        
        res.status(200).json({
            success: true,
            message: "Successfully retrieved booking",
            data: book
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
}

// get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find();
        res.status(200).json({
            success: true,
            message: "Successfully retrieved all bookings",
            data: books
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve bookings. Try again",
        });
    }
}