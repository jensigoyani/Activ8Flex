import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import profile from '../../../assets/image/profile/man.png'

const InstructorNavbar = () => {
    return (
        <>
            <header className="curved-header">
                <div className="logo">
                    <Link to="/instructor/">&#129496; ACTIV8Flex </Link>
                </div>
                <ul className="nav-links">
                    <li><NavLink to='/instructor/contact' >Contact Us</NavLink></li>
                    <li><NavLink to='/instructor/chat' >Let's chat</NavLink></li>
                    
                    <li><NavLink to='/instructor/appointment'>Appointment</NavLink></li>
                    <li><NavLink to='/instructor/feedback' >Feedbacks</NavLink></li>
    {/*<li><NavLink to='/instructor/payment' >Payments</NavLink></li>*/}
                    <li><NavLink to='/instructor/weeklyschedule'>Schedule</NavLink></li>
                    <li className='li-navbar'><NavLink to='/instructor/profile'><img className='profile' src={profile} alt='profile.png' /></NavLink></li>


                </ul>
            </header>
        </>
    );
}

export default InstructorNavbar;