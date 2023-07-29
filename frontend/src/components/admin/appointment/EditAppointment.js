import React, { useState, useEffect } from "react";
import "../style.css"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAppointment = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [weight, setWeight] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8800/appointment/appointments/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setDate(response.data.date);
        setService(response.data.service);
        setGender(response.data.gender);
        setPhone(response.data.phone);
        setWeight(response.data.weight);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8800/appointment/appointments/${id}`, {
                name,
                email,
                date,
                service,
                gender,
                phone,
                weight
            });
            navigate("/admin/appointment/list");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="user-main">
            <div className="container-xli">
                <div className="column is-half">
                    <form onSubmit={updateUser}>
                        <h1 className="h1-admin">Update Appointment</h1>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Date</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Gender</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Phone</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Service</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Weight</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" id="view" className="view">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAppointment;
