import mongoose from 'mongoose';
import Tour from './models/Tour.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleTours = [
    {
        title: "Westminister Bridge London",
        city: "London",
        address: "Westminster Bridge, London, UK",
        distance: 300,
        photo: "http://localhost:4000/images/tour-img01.jpg",
        desc: "Experience the iconic Westminster Bridge with stunning views of the Thames River and London's historic landmarks.",
        price: 99,
        maxGroupSize: 10,
        featured: true,
    },
    {
        title: "Bali, Indonesia Paradise",
        city: "Bali",
        address: "Bali, Indonesia",
        distance: 400,
        photo: "http://localhost:4000/images/tour-img02.jpg",
        desc: "Discover the tropical paradise of Bali with its beautiful beaches, temples, and rich culture.",
        price: 149,
        maxGroupSize: 8,
        featured: true,
    },
    {
        title: "Snowy Mountains Thailand",
        city: "Chiang Mai",
        address: "Chiang Mai, Thailand",
        distance: 500,
        photo: "http://localhost:4000/images/tour-img03.jpg",
        desc: "Explore the breathtaking snowy mountains and authentic culture of northern Thailand.",
        price: 120,
        maxGroupSize: 12,
        featured: true,
    },
    {
        title: "Beautiful Sunrise Thailand",
        city: "Phuket",
        address: "Phuket, Thailand",
        distance: 500,
        photo: "http://localhost:4000/images/tour-img04.jpg",
        desc: "Wake up to stunning sunrises over the Andaman Sea in beautiful Phuket.",
        price: 110,
        maxGroupSize: 8,
        featured: true,
    },
    {
        title: "Nusa Penida Bali",
        city: "Nusa Penida",
        address: "Nusa Penida, Bali, Indonesia",
        distance: 450,
        photo: "http://localhost:4000/images/tour-img05.jpg",
        desc: "Adventure to the stunning cliffs and crystal-clear waters of Nusa Penida island.",
        price: 180,
        maxGroupSize: 6,
        featured: true,
    },
    {
        title: "Cherry Blossom Japan",
        city: "Tokyo",
        address: "Tokyo, Japan",
        distance: 800,
        photo: "http://localhost:4000/images/tour-img06.jpg",
        desc: "Experience the magical cherry blossom season in Tokyo's most beautiful parks.",
        price: 250,
        maxGroupSize: 15,
        featured: false,
    },
    {
        title: "Holmen Lofoten Norway",
        city: "Lofoten",
        address: "Lofoten Islands, Norway",
        distance: 1200,
        photo: "http://localhost:4000/images/tour-img07.jpg",
        desc: "Discover the dramatic beauty of Norway's Lofoten Islands with their towering peaks and fishing villages.",
        price: 320,
        maxGroupSize: 10,
        featured: false,
    },
    {
        title: "Snowy Mountain Adventure",
        city: "Alps",
        address: "Swiss Alps, Switzerland",
        distance: 900,
        photo: "http://localhost:4000/images/tour-img08.jpg",
        desc: "Experience the majesty of the Swiss Alps with pristine snow-covered peaks and alpine villages.",
        price: 400,
        maxGroupSize: 8,
        featured: false,
    }
];

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB database Connected');
    } catch (err) {
        console.error('MongoDB database Connection failed:', err);
    }
};

const seedTours = async () => {
    try {
        await connect();
        
        // Xóa tất cả tours cũ
        await Tour.deleteMany({});
        console.log('Deleted all existing tours');
        
        // Thêm tours mới
        await Tour.insertMany(sampleTours);
        console.log('Sample tours added successfully');
        
        console.log('Seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedTours();
