import React, { useState, useEffect } from "react";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import "../style.css"
import axios from "axios";
import { feedbackInstructorRoute } from '../../../utils/APIRoutes';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        getInstructors();
    }, []);

    const getInstructors = async () => {
        const response = await axios.get(feedbackInstructorRoute);
        setFeedbacks(response.data);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(feedbacks.length / itemsPerPage); i++) {
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
                        <h1 className="admin-h1">User Feedbacks</h1>
                        <table className="table is-striped is-fullwidth mt-2 table-ins">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Feedback</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks && currentItems.map((feedback, index) => {
                                    const date = new Date(feedback.createdAt);
                                    const FeedbackDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

                                    return (
                                        <tr key={feedback._id}>
                                            <td>{index + 1}</td>
                                            <td>{feedback.name}</td>
                                            <td>{feedback.email}</td>
                                            <td>{feedback.feedback}</td>
                                            <td>{FeedbackDate}</td>
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

export default FeedbackList;
