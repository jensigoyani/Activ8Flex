import React, { useEffect, useState } from 'react';
import './style.css'
import { PopupMenu } from "react-simple-widgets";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import activ8flexLogo from "../../assets/ACTIV8FLEX/ACTIV8FLEX_LOGO.png"

const Navbar = () => {
    const data = JSON.parse(localStorage.getItem('Instructor'));
    const instructor = data;
    const [currentInstructor, serCurrentInstructor] = useState({})
    const navigate = useNavigate()

    const getUser = async () => {
        const response = await axios.get(`http://localhost:8800/instructor/instructors/${instructor._id}`);
        const details = (response.data);
        serCurrentInstructor(details)
    };

    const handleClick = () => {
        localStorage.removeItem("Instructor")
        localStorage.clear("Instructor")
        navigate("/instructor/login");
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <header className='header'>
                <div className="logosec">
                <Link className="nav-logo" to="/instructor"><img className="ACTIV8FLEX_LOGO" src={activ8flexLogo} /></Link>
                </div>
                <div className="message">
                    <div className="dp">
                        <PopupMenu className='popup'>
                            <button className='admin-profile'>
                                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" className="dpicn" alt="dp" />
                            </button>
                            <div className="card-instructor">
                                <div className="card-instructor-body">
                                    <br />
                                    <div id="circle-avatar-ins" className="text-center">
                                        <span>I</span>
                                    </div>
                                    <div className='ins-data'>
                                        <h1>{currentInstructor?.name}</h1> <br />
                                        <p>Email : <span>{currentInstructor?.email}</span></p>
                                        <p>Phone : <span>{currentInstructor?.phone}</span></p>
                                        <p>Qualification : <span>{currentInstructor?.qualification}</span></p>
                                        <p>Experience : <span>{currentInstructor?.experience}</span></p> <br />
                                    </div>
                                    <div className="Grid">
                                        <button className="view btn-secondary" onClick={handleClick}>Log Out</button>
                                        <button className="view btn-secondary"><Link to={'/instructor/reset-password'} style={{
                                            textDecoration: "none",
                                            color: "white"
                                        }}>Change password</Link></button>
                                        <button className="view btn-secondary">
                                            <Link to={`/instructor/edit/${currentInstructor?._id}`} style={{ textDecoration: "none", color: "white" }}>
                                                Edit
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </PopupMenu>
                    </div>
                </div>

            </header>
        </>
    );
}

export default Navbar;
