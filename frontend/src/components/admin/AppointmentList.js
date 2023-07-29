import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "./style.css"
import axios from "axios";
const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [serachInput, setSerachInput] = useState('')
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        getAppointment();
    }, []);

    const serachAppointment = (searchValue) => {
        setSerachInput(searchValue)
        if (serachInput !== '') {
            const filteredData = appointments.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(serachInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(appointments)
        }
    }

    const getAppointment = async () => {
        const response = await axios.get("http://localhost:8800/appointment/appointments");
        setAppointments(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/appointment/appointments/${id}`);
            getAppointment();
        } catch (error) {
            console.log(error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(appointments.length / itemsPerPage); i++) {
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
                        <h1 className="admin-h1">Appointment Management</h1>
                        <div className="searchbar">
                            <input type="text"
                                placeholder="Search"
                                onChange={(e) => serachAppointment(e.target.value)}
                            />
                        </div>

                        <table className="table is-striped is-fullwidth mt-2 ">
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serachInput.length > 1 ? (
                                    filteredResults.map((item, index) => {
                                        const date = new Date(item.date)
                                        const appointmentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                                        const birth = new Date(item.birthdate)
                                        const birthdate = birth.getDate() + '/' + birth.getMonth() + '/' + birth.getFullYear();
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
                                                <td className="edit">
                                                    <button onClick={() => deleteUser(item._id)}
                                                        className="delete">
                                                        <i className="fab fa-solid fa-trash" data-toggle="tooltip" title="Delete"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    appointments && currentItems.map((appointment, index) => {
                                        const date = new Date(appointment.date)
                                        const appointmentDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                                        const birth = new Date(appointment.birthdate)
                                        const birthdate = birth.getDate() + '/' + birth.getMonth() + '/' + birth.getFullYear();
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
                                                <td className="edit">
                                                    <button onClick={() => deleteUser(appointment._id)}
                                                        className="delete">
                                                        <i className="fab fa-solid fa-trash" data-toggle="tooltip" title="Delete"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
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

export default AppointmentList;
