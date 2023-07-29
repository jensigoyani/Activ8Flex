import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { allInstructorRoute, allUserChatRoute } from '../../utils/APIRoutes';
import './style.css'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Ins = () => {
    const [user, setUser] = useState([]);
    const [appointment,setAppointment] = useState([])

    const allUsers = async () => {
        const res = await axios.get(allUserChatRoute)
        setUser(res.data)
    }

    const allAppointment = async() => {
        const res = await axios.get("http://localhost:8800/appointment/appointmentlist")
        console.log(res.data);
        setAppointment(res.data)
    }

    useEffect(() => {
        allUsers()
    }, []);

    useEffect(() => {
        allAppointment()
    }, [])
    return (
        <>
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="main">
                    <div className="searchbar2">
                        <input type="text"
                            name=""
                            id=""
                            placeholder="Search" />
                        <div className="searchbtn">
                            <img src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                                className="icn srchicn"
                                alt="search-button" />
                        </div>
                    </div>

                    <div className="box-container">

                        <div className="box box1">
                            <div className="text">
                                <h2 className="topic-heading">60.5k</h2>
                                <h2 className="topic">Article Views</h2>
                            </div>

                            <img src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                                alt="Views" />
                        </div>

                        <div className="box box2">
                            <div className="text">
                                <h2 className="topic-heading">150</h2>
                                <h2 className="topic">Likes</h2>
                            </div>

                            <img src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
                                alt="likes" />
                        </div>

                        <div className="box box3">
                            <div className="text">
                                <h2 className="topic-heading">320</h2>
                                <h2 className="topic">Comments</h2>
                            </div>

                            <img src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                                alt="comments" />
                        </div>

                        <div className="box box4">
                            <div className="text">
                                <h2 className="topic-heading">70</h2>
                                <h2 className="topic">Published</h2>
                            </div>

                            <img src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png" alt="published" />
                        </div>
                    </div>

                    <div className='main-dash-div'>
                    <div className="report-container">
                    <div className="report-header">
                        <h1 className="recent-Articles">User Details</h1>
                        <button className="view"><Link style={{
                            textDecoration: "none",
                            color: "white"
                        }} to="http://localhost:3000/instructor/users"> View All</Link></button>
                    </div>

                    <div className="report-body">
                        <div className="report-topic-heading">
                            <h3 className="t-op">User Name</h3>
                            <h3 className="t-op-email">Email</h3>
                        </div>
                        
                        <div className="items">
                            {
                                user && user.slice(0,5).map((user) => {
                                    return (
                                        <table>
                                        <div className="item1">
                                            <td><h3 className="t-op-nextlvl">{user.username}</h3></td>
                                            <td><h3 className="t-op-nextlvl">{user.email}</h3></td>
                                        </div>
                                    </table>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="report-container">
                    <div className="report-header">
                        <h1 className="recent-Articles">Appointment List</h1>
                        <button className="view"><Link style={{
                            textDecoration: "none",
                            color: "white"
                        }} to="http://localhost:3000/instructor/appointment"> View All</Link></button>
                    </div>

                    <div className="report-body">
                        <div className="report-topic-heading">
                            <h3 className="t-op">Name</h3>
                            <h3 className="t-op-email">Service</h3>
                        </div>

                        <div className="items">
                            {
                                appointment && appointment.slice(0,5).map((ins) => {
                                    return (
                                        <table>
                                        <div className="item1">
                                            <td><h3 className="t-op-nextlvl">{ins.name}</h3></td>
                                            <td><h3 className="t-op-nextlvl">{ins.service}</h3></td>
                                        </div>
                                    </table>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Ins;
