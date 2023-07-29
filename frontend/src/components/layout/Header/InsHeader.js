import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import InstructorNavbar from '../Navbar/InstructorNavbar';

const InsHeader = () => {
    return (
        <>
            <InstructorNavbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default InsHeader;