import React from 'react';
import Header from '../Header/Header'; 
import Footer from '../Footer/Footer';
import AppRoutes from '../../router/Routers'; 
const Layout = () => {
    return (
        <>
            <Header />
            <AppRoutes />
            <Footer />
        </>
    );
};

export default Layout;
