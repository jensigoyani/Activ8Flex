import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8800/user/users/${id}`);
        setUserName(response.data.username);
        setEmail(response.data.email);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8800/user/users/${id}`, {
                userName,
                email,
            });
            navigate("/admin/users/list");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="user-main">
            <div className="container-xli">
                <div className="column is-half">
                    <form onSubmit={updateUser}>
                        <h1 className="h1-admin">Update User</h1>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
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
};

export default EditUser;