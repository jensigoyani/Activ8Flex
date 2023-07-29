import './style.css';
import React from 'react';
function PaymentSuccess() {
    return (
        <div className='payment-success'>
            <div className="card-payment">
                <div className='s-payment'>
                    <i className="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
            </div>
        </div>
    )

}

export default PaymentSuccess;
