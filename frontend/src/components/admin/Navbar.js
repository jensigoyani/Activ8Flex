import React, { useEffect, useState } from 'react';
import './style.css'
import { PopupMenu } from "react-simple-widgets";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem('admin')))
    }, []);

    const handleClick = () => {
        localStorage.removeItem("admin")
        localStorage.clear("admin")
        navigate("/admin/login");
    };

    return (
        <>
            <header className='header'>
                <div className="logosec">
                    <div className="logo">ACTIV8Flex</div>
                </div>
                <div className="message">
                    <div className="dp">
                        <PopupMenu className='popup'>
                            <button className='admin-profile'>
                                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" className="dpicn" alt="dp" />
                            </button>
                            <div className="card-admin">
                                <div className="card-admin-body">
                                    <br />
                                    <div id="circle-avatar" className="text-center">
                                        <span>A</span>
                                    </div>
                                    <p className="text-center">{admin?.email}</p>
                                    <div className="Grid">
                                        <button className="view btn-secondary" onClick={handleClick}>Log Out</button>
                                        <button className="view btn-secondary"><Link to={'/admin/reset-password'} style={{
                                            textDecoration: "none",
                                            color: "white"
                                        }}>Change password</Link></button>
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
