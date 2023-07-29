import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { contactInstructorRoute } from '../../../utils/APIRoutes';
import Navbar from '../../Instructor/Navbar';
import Sidebar from '../../Instructor/Sidebar';

const ContactUsInstructor = () => {
    const [contactinsrt, setcontactinsrt] = useState([])

    const sendcontactinsrt = async () => {
        const contactinsrts = await axios.get(contactInstructorRoute);
        setcontactinsrt(contactinsrts.data)
        console.log(contactinsrts.data)
    }

    useEffect(() => {
        sendcontactinsrt()
    }, []);

    return (
        <>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="container-xl">
                    <div className="column is-half"><br /><br />
                        <h1 className="admin-h1">User Questions</h1>
                        <table className="table is-striped is-fullwidth mt-2 table-ins">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Question</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactinsrt.map((contact, index) => {
                                    const d = new Date(contact.createdAt);
                                    const date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
                                    return (
                                        <tr key={contact._id}>
                                            <th>{index + 1}</th>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.question}</td>
                                            <td>{date}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUsInstructor;
