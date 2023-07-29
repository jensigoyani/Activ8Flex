import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { feedbackInstructorRoute } from '../../../utils/APIRoutes';
import Navbar from '../../Instructor/Navbar';
import Sidebar from '../../Instructor/Sidebar';

const FeedbackInstructor = () => {
    const [feedback, setFeedback] = useState([])

    const sendFeedback = async () => {
        const feedbacks = await axios.get(feedbackInstructorRoute);
        setFeedback(feedbacks.data)
        // console.log(feedbacks)
    }

    useEffect(() => {
        sendFeedback()
    }, []);

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
                                {feedback.map((feedback, index) => {
                                    const d = new Date(feedback.createdAt);
                                    const date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
                                    return (
                                        <tr key={feedback._id}>
                                            <th>{index + 1}</th>
                                            <td>{feedback.name}</td>
                                            <td>{feedback.email}</td>
                                            <td>{feedback.feedback}</td>
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

export default FeedbackInstructor;
