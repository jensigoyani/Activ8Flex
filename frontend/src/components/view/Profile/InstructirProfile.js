import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../../assets/image/profile/man.png'
import InsLogOUt from '../logout/InsLogOut';
import Logout from '../logout/userLogOut';
import './style.css'

function InstructorProfile() {
    const data = JSON.parse(localStorage.getItem('Instructor'));
    const instructor = data.instructor;
    const navigate = useNavigate();
    const [currentInstructor, serCurrentInstructor] = useState({})


    const getUser = async () => {
        const response = await axios.get(`http://localhost:8800/instructor/instructors/${instructor._id}`);
        const details = (response.data);
        serCurrentInstructor(details)
    };
    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <div className="container-profile-main">
            <div className="img-bx">
                <img className="profile-img" src={profile} alt="profile.jpg" />
            </div>
            <div className="profile-data">
                <div className="detail">
                    <h1>{currentInstructor.name}</h1>
                    <p >Email : <span>{currentInstructor.email}</span></p>
                    <p className='instructor-data'>Phone : <span>{currentInstructor.phone}</span></p>
                    <p className='instructor-q'>Qualification : <span>{currentInstructor.qualification}</span></p>
                    <p className='instructor-e'>Experience : <span>{currentInstructor.experience}</span></p>
                </div><br></br>
                <div>
                    <button className='profile-btn'>
                        <Link
                            to={`/instructor/edit/${currentInstructor._id}`}
                            className="button is-info is-small mr-1"
                        >
                            <i className="fab fa-solid fa-pen-to-square btn-profile" id='profile-icon' data-toggle="tooltip" title="Edit"></i>
                        </Link>
                        <InsLogOUt />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default InstructorProfile;