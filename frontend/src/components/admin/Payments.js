import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "./style.css"
import axios from "axios";
import { listInvoice } from "../../utils/APIRoutes";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [serachInput, setSerachInput] = useState('')
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        paymentList();
    }, []);

    const paymentList = async () => {
        const result = await axios.get(listInvoice);
        setPayments(result.data);
    }

    const deletePayment = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/payment/payments/${id}`);
            paymentList();
        } catch (error) {
            console.log(error);
        }
    };

    const serachPayment = (searchValue) => {
        setSerachInput(searchValue)
        if (serachInput !== '') {
            const filteredData = payments.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(serachInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(payments)
        }
    }



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(payments.length / itemsPerPage); i++) {
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
                        <h1 className="admin-h1">Payments</h1>
                        <div className="searchbar">
                            <input type="text"
                                placeholder="Search"
                                onChange={(e) => serachPayment(e.target.value)}
                            />
                        </div>

                        <table className="table is-striped is-fullwidth mt-2 table-ins">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Service ID</th>
                                    <th>Invoice ID</th>
                                    <th>Date & Time</th>
                                    <th>Amounts</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serachInput.length > 1 ? (
                                    filteredResults.map((payment, index) => {
                                        const d = new Date(payment.createdAt);
                                        const date = d.toLocaleString();
                                        return (
                                            <tr key={payment._id}>
                                                <th>{index + 1}</th>
                                                <td>{payment.username}</td>
                                                <td>{payment.orderId}</td>
                                                <td>{payment.paymentId}</td>
                                                <td>{date}</td>
                                                <td>{payment.amount / 100}</td>
                                                <td><button onClick={() => deletePayment(payment._id)}
                                                    className="delete">
                                                    <i className="fab fa-solid fa-trash" data-toggle="tooltip" title="Delete"></i>
                                                </button></td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    payments && currentItems.map((payment, index) => {
                                        const d = new Date(payment.createdAt);
                                        const date = d.toLocaleString();
                                        return (
                                            <tr key={payment._id}>
                                                <th>{index + 1}</th>
                                                <td>{payment.username}</td>
                                                <td>{payment.orderId}</td>
                                                <td>{payment.paymentId}</td>
                                                <td>{date}</td>
                                                <td>{payment.amount / 100}</td>
                                                <td><button onClick={() => deletePayment(payment._id)}
                                                    className="delete">
                                                    <i className="fab fa-solid fa-trash" data-toggle="tooltip" title="Delete"></i>
                                                </button></td>
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

export default Payments;
