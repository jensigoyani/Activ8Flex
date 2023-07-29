import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../style.css";
import profile from '../../../assets/image/profile/man.png'
import activ8flexLogo from "../../../assets/ACTIV8FLEX/ACTIV8FLEX_LOGO.png"
function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link className="nav-logo" to="/"><img className="ACTIV8FLEX_LOGO" src={activ8flexLogo} /></Link>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={({ isActive }) => (isActive ? "active" : 'nav-links')}
                                // className="nav-links"
                                onClick={handleClick}
                            >About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/userchat"
                                className={({ isActive }) => (isActive ? "active" : 'nav-links')}
                                // className="nav-links"
                                onClick={handleClick}
                            >Let's Chat</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/classes"
                                className={({ isActive }) => (isActive ? "active" : 'nav-links')}
                                // className="nav-links"
                                onClick={handleClick}
                            >Classes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/pricing"
                                className={({ isActive }) => (isActive ? "active" : 'nav-links')}
                                // className="nav-links"
                                onClick={handleClick}
                            >Membership</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/weeklyschedule"
                                className={({ isActive }) => (isActive ? "active" : 'nav-links')}
                                // className="nav-links"
                                onClick={handleClick}
                            >Schedule</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => (isActive ? "active" : 'nav-links')}
                                // className="nav-links"
                                onClick={handleClick}
                            >Contact Us</NavLink>
                        </li>
                        <li>
                            <div className="vertical"></div>
                        </li>

                        <li className='nav-item'><NavLink to='/profile'><i className='fa fa-user-alt profile' src={profile} ></i></NavLink></li>

                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;