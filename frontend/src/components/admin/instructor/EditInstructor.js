import React, { useState, useEffect } from "react";
import "../style.css"
import "../../view/registration/style.css"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const EditInstructor = () => {
    const [userName, setUserName] = useState("");
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
        setUserName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone)
        setQualification(response.data.qualification)
        setExperience(response.data.experience)
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8800/instructor/instructors/${id}`, {
                userName,
                email,
                phone,
                qualification,
                experience
            });
            navigate("/admin/instructors/list");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className=".container-ins-login-main ">
                    <div className="content-register">
                        <div className="form-group" style={{
                            marginLeft: "304px",
                            marginTop: "146px"
                        }}>
                            <form onSubmit={updateUser} className="edit-ins-form">
                                <h1>Update Instructor</h1>

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
                                                className="form-control-p"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Mobile number"
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
                                                placeholder="Qualifivation"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="form-group emailId">
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control-e"
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                                placeholder="Qualifivation"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-register" style={{
                                    marginLeft: "15px"
                                }}>
                                    Edit Instructor
                                </button>

                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default EditInstructor;
