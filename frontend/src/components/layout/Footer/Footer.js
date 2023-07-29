import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-user">
                    <br/> <br/><br/><br/>
                    <div className="row">
                        <ul>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/classes">Classes</NavLink></li>
                            <li><NavLink to="/pricing">Membership</NavLink></li>
                            <li><NavLink to="/weeklyschedule">Schedule</NavLink></li>
                            <li><NavLink to="/contact">Contact Us</NavLink></li>
                        </ul>
                    </div>
                    <div className="row">
                        <a href="https://instagram.com/activ8flex" target="_blank"><i className="fab fa-instagram"></i></a>
                        <a href="https://youtube.com/@activ8flex" target="_blank"><i className="fab fa-youtube"></i></a>
                        <a href="https://twitter.com/A8flex?t=ouHDT0nDm-UXc-EyjvVf7A&s=09" target="_blank"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;