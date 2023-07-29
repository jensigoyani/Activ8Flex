import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../registration/style.css"

const EditUserProfile = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8800/user/users/${id}`);
        setUserName(response.data.username);
        setEmail(response.data.email);
        setContact(response.data.contact)
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8800/user/users/${id}`, {
                userName,
                email,
                contact
            });
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-register-main">
            <div className="content-register">
                <div className="form-group">
                    <form onSubmit={updateUser}>
                        <h1>Edit Profile</h1>

                        <div className="contact-detail">
                            <div className="form-group emailId">
                                <div className="inputWithIcon">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
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
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder="contact"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-register">
                            <NavLink style={{
                                textDecoration: "none",
                                color: "white"
                            }} to={"http://localhost:3000/profile"}>
                                Edit
                            </NavLink>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserProfile;