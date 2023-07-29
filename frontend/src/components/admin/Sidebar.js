import './style.css';
import React from 'react';
import user from '../../assets/image/admin/user.png'
import dashboard from '../../assets/image/admin/dashboard.png'
import instructor from '../../assets/image/admin/instructor.png'
import payment from '../../assets/image/admin/payment.png'
import appointment from '../../assets/image/admin/appointment.png'
import feedback from '../../assets/image/admin/feedback.png'
import contact from '../../assets/image/admin/contact.png'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className="navcontainer">
                <nav className="nav">
                    <div className="nav-upper-options">
                        <div className="nav-option option1">
                            <img src={dashboard} className="nav-img"
                                alt="dashboard" />
                                <h3> <NavLink to='/admin/home' id='a-dashbord'>Dashboard</NavLink></h3>
                        </div>

                        <div className="option2 nav-option">
                            <img src={user}
                                className="nav-img"
                                alt="articles" />
                            <h3> <NavLink to='/admin/users/list' className='a-dashbord'>Users</NavLink></h3>
                        </div>

                        <div className="nav-option option3">
                            <img src={instructor}
                                className="nav-img"
                                alt="report" />
                                <h3> <NavLink to='/admin/instructors/list' className='a-dashbord'>Instructors</NavLink></h3>
                        </div>

                        <div className="nav-option option4">
                            <img src={payment}
                                className="nav-img"
                                alt="institution" />
                                <h3> <NavLink to='/admin/payment/list' className='a-dashbord'>Payments</NavLink></h3>
                        </div>
                        <div className="nav-option option4">
                            <img src={appointment}
                                className="nav-img"
                                alt="institution" />
                                <h3> <NavLink to='/admin/appointment/list' className='a-dashbord'>Appointment</NavLink></h3>
                        </div>
                        <div className="nav-option option4">
                            <img src={contact}
                                className="nav-img"
                                alt="institution" />
                                <h3> <NavLink to='/admin/contact/list' className='a-dashbord'>Contact</NavLink></h3>
                        </div>
                        <div className="nav-option option4">
                            <img src={feedback}
                                className="nav-img"
                                alt="institution" />
                                <h3> <NavLink to='/admin/feedback/list' className='a-dashbord'>Feedback</NavLink></h3>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
