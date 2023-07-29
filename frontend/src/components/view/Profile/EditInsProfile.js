import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../registration/style.css"
import Navbar from '../../Instructor/Navbar';
import Sidebar from '../../Instructor/Sidebar';

function EditInstructorProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8800/instructor/instructors/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setQualification(response.data.qualification);
        setExperience(response.data.experience);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8800/instructor/instructors/${id}`, {
                name,
                email,
                phone,
                qualification,
                experience
            });
            navigate("/instructor/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='main-container'>
                <Sidebar />
                <div className="container-ins-login-main">
                    <div className="content-register">
                        <div className="form-group">
                            <form onSubmit={updateUser} className="edit-profile">
                                <h1>Edit Profile</h1>

                                <div className="contact-detail">
                                    <div className="form-group emailId">
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="form-group emailId">
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="form-group emailId">
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="+91"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="form-group emailId">
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={qualification}
                                                onChange={(e) => setQualification(e.target.value)}
                                                placeholder="Qualification"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="form-group emailId">
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                                placeholder="Experience"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-register">
                                    Edit
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditInstructorProfile;