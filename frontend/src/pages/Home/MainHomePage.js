
import { Outlet } from 'react-router-dom'
import Footer from '../../components/layout/Footer/Footer';
import NavBar from '../../components/layout/Navbar/Navbar';

const MainHomePage = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer/>
        </>
    );
}

export default MainHomePage;
