import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import Navbar from '../../Instructor/Navbar';
import Sidebar from '../../Instructor/Sidebar';

const InstructorAppointment = () => {
    const [appointment, setAppointment] = useState([])
    const [serachInput, setSerachInput] = useState('')
    const [filteredResults, setFilteredResults] = useState([]);

    const getAppointment = async () => {
        const response = await axios.get("http://localhost:8800/appointment/appointments");
        setAppointment(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getAppointment()
    }, []);

    const serachAppointment = (searchValue) => {
        setSerachInput(searchValue)
        if (serachInput !== '') {
            const filteredData = appointment.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(serachInput.toLowerCase())
            })
            setFilteredResults(filteredData)
            console.log(filteredData);
        }
        else {
            setFilteredResults(appointment)
        }
    }

    return (
        <>
        <Navbar />
        <div className="main-container">
            <Sidebar />
            <div className="container-xl">
                <div className="column is-half"><br /><br />
                    <h1 className="admin-h1">Appointment Management</h1>
                    <div className="searchbar">
                        <input type="text"
                            placeholder="Search"
                            onChange={(e) => serachAppointment(e.target.value)}
                            />
                    </div>
                    <table className="table is-striped is-fullwidth mt-2">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Birthdate</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Appointment Date</th>
                                <th>Service</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serachInput.length > 1 ? (
                                filteredResults.map((item, index) => {
                                    const date = new Date(item.date)
                                    const appointmentDate =  date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                                    const birth = new Date(item.birthdate)
                                    const birthdate =  birth.getDate() + '/' + birth.getMonth() + '/' + birth.getFullYear();
                                    return (
                                        <tr key={item._id} >
                                            <th>{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{birthdate}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.phone}</td>
                                            <td >{appointmentDate}</td>
                                            <td>{item.service}</td>
                                            <td>{item.weight}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                appointment.map((appointment, index) => {
                                    const date = new Date(appointment.date)
                                    const appointmentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                                    const birth = new Date(appointment.birthdate)
                                    const birthdate =  birth.getDate() + '/' + birth.getMonth() + '/' + birth.getFullYear();
                                    return (
                                        <tr key={appointment._id} >
                                            <th>{index + 1}</th>
                                            <td>{appointment.name}</td>
                                            <td>{appointment.email}</td>
                                            <td>{birthdate}</td>
                                            <td>{appointment.gender}</td>
                                            <td>{appointment.phone}</td>
                                            <td >{appointmentDate}</td>
                                            <td>{appointment.service}</td>
                                            <td>{appointment.weight}</td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default InstructorAppointment;