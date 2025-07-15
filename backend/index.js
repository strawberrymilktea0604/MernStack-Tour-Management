    import express from 'express';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import cookieParser from 'cookie-parser';
    import path from 'path';
    import { fileURLToPath } from 'url';

    import tourRoute from './routes/tours.js';
    import userRoute from './routes/users.js';
    import authRoute from './routes/auth.js';
    import reviewRoute from './routes/reviews.js';
    import bookingRoute from './routes/bookings.js';

    dotenv.config();
    const app = express();
    const port = process.env.PORT || 8000;

    // ES modules equivalent of __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const corsOptions = {
        origin: ['http://localhost:3000', 'http://localhost:3001'], // Add common React dev server ports
        credentials: true,
    };

    // Database connection
    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);  // Bỏ options deprecated
            console.log('MongoDB database Connected');
        } catch (err) {
            console.error('MongoDB database Connection failed:', err);  // In chi tiết lỗi
        }
    };

    // Middleware
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(cookieParser());

    // Serve static files (images)
    app.use('/images', express.static(path.join(__dirname, 'public/images')));

    app.use("/api/v1/auth", authRoute);
    app.use('/api/v1/tours', tourRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/reviews', reviewRoute);
    app.use('/api/v1/bookings', bookingRoute);

    const startServer = async () => {
        try {
            await connect();
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        } catch (err) {
            console.error('Failed to start server:', err);
        }
    };

    startServer();
