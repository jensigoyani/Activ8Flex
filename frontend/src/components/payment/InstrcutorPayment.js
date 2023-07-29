import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { listInvoice } from '../../utils/APIRoutes';

const InstructorPayment = () => {
    const [list, setList] = useState([]);
    const paymentList = async () => {
        const result = await axios.get(listInvoice);
        setList(result.data);
        console.log(result.data);
    }
    useEffect(() => {
        paymentList()
    }, []);
    return (
        <>
            <div className='paymentinsrt-main'>
                <div className="list-paymentinsrt">
                    <ul className='ul-instructor'>
                        <li>Username</li>
                        <li>Date & Time</li>
                        <li>invoiceNumber</li>
                        <li>paymentId</li>
                        <li>Amount</li>
                    </ul>
                    {list.map((val,x,y) => {
                        const d = new Date(val.createdAt)
                        const date = d.toLocaleString();
                        return (
                            <ul key={`${val._id}`}>
                            <li data-label="Amount">{val.username}</li>
                            <li data-label="Amount">{date}</li>
                            <li data-label="Amount">{val.orderId}</li>
                            <li data-label="Amount">{val.paymentId}</li>
                            <li data-label="Amount">{val.amount / 100}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default InstructorPayment;