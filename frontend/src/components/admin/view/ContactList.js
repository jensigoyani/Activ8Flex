import React, { useState, useEffect } from "react";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import "../style.css"
import axios from "axios";
import { contactInstructorRoute } from '../../../utils/APIRoutes';

const ContactList = () => {
    const [contact, setContact] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        getContact();
    }, []);

    const getContact = async () => {
        const response = await axios.get(contactInstructorRoute);
        setContact(response.data);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = contact.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(contact.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li key={number}>
                <button onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            </li>
        );
    });
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
                                    <th>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact && currentItems.map((contact, index) => {

                                    const date = new Date(contact.createdAt);
                                    const contactDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                                    return (
                                        <tr key={contact._id}>
                                            <td>{index + 1}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.question}</td>
                                            <td>{contactDate}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <ul id="page-numbers" className="pagination">
                            {renderPageNumbers}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactList;
