import React, { useState } from 'react'
import axios from 'axios'
import "./styles.css"

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8800/user/password-link', { email });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container-login-main">
                <div className="content-login">
                    <div className="form-group">
                        <form onSubmit={handleSubmit}>
                            <h1>Forget Password</h1>
                            <p className="login-p">We will send password set-up link in your inbox. Please check...!!</p> <br />
                            <div className="contact-detail">
                                <div className="form-group emailId">
                                    <div className="inputWithIcon">
                                        <input
                                            type="email"
                                            className="form-controls"
                                            placeholder="Enter your Email"
                                            name="email"
                                            min="3"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <i className="fa fa-envelope fa-lg fa-fw mail" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <button className="btn">SEND E-MAIL</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword
