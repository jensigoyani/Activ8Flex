import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "./style.css"
import axios from "axios";

const UserList = () => {
    const [users, setUser] = useState([]);
    const [serachInput, setSerachInput] = useState('')
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8800/user/users");
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/user/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const serachUser = (searchValue) => {
        setSerachInput(searchValue)
        if (serachInput !== '') {
            const filteredData = users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(serachInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(users)
        }
    }


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
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
                    <div className="column"><br /><br />
                        <h1 className="admin-h1">User Management</h1>
                        <div className="searchbar">
                            <input type="text"
                                placeholder="Search"
                                onChange={(e) => serachUser(e.target.value)}
                            />
                        </div>
                        <table className="table table-ins">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Gender</th>
                                    <th>Date Of Birth</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serachInput.length > 1 ? (
                                    filteredResults.map((user, index) => {
                                        const d = new Date(user.dob);
                                        const date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
                                        return (
                                            <tr key={user._id}>
                                                <th>{index + 1}</th>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.contact}</td>
                                                <td>{user.gender}</td>
                                                <td>{date}</td>
                                                <td className="edit">
                                                    <button onClick={() => deleteUser(user._id)}
                                                        className="delete">
                                                        <i className="fab fa-solid fa-trash" data-toggle="tooltip" title="Delete"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    users && currentItems.map((user, index) => {
                                        const d = new Date(user.dob);
                                        const date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
                                        return (
                                            <tr key={user._id}>
                                                <th>{index + 1}</th>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.contact}</td>
                                                <td>{user.gender}</td>
                                                <td>{date}</td>
                                                <td className="edit">
                                                    <button onClick={() => deleteUser(user._id)}
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

export default UserList;
