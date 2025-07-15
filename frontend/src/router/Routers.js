import      React from 'react'; // 6.9k (gzipped: 2.7k)
import {Routes,Route,Navigate} from 'react-router-dom'; // 13.4k (gzipped: 5.3k)

import Home from '../pages/Home';
import TourDetails from '../pages/TourDetails';
import Tours from '../pages/Tours';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/tours/search" element={<SearchResultList />} />
            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
}
export default Routers;