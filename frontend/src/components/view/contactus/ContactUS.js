import React, { useState } from 'react';
import './style.css'
import axios from 'axios'
import MAP from "../../../assets/ACTIV8FLEX/CONTACT_MAP.png"
import PHONE from "../../../assets/ACTIV8FLEX/PHONE_CONTACT.png"
import EMAIL from "../../../assets/ACTIV8FLEX/EMAIL.png"
import PHONE_BACKGROUND from "../../../assets/ACTIV8FLEX/PHONE_BACKGROUND.png"
import { contactRoute } from '../../../utils/APIRoutes';

const ContactUS = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        question: ""
    })

    // handle on change
    const handleChange = e => {
        const { name, value } = e.target
        setContact({
            ...contact,//spread operator 
            [name]: value
        })
    }
    const ContactUS = () => {
        const { name, email, question } = contact
        if (name && email && question) {
            axios.post(contactRoute, contact)
                .then(res => console.log(res));
            alert('Sended your Qusetion..!!')
        }
        else {
            alert("Fill all the feilds...!!")
        }
    }

    const handleCall = () => {
        window.location.href = "tel:+9574767622"
    }

    const handleMail = () => {
        window.location.href = "mailto:activ8flex@gmail.com"
    }
    
    return (
        <>
            <div className="About">
                <div className="mainContact">
                    <div className="overlay"></div>
                    <div className="contentContact">
                        <h1>Contact Us</h1>
                    </div>
                </div>

                <div className='main-contact-div'>
                    <div className='first-contact-div'>
                        <h1>Let's talk</h1>
                        <div className='phone'>
                            <div>
                                <img src={PHONE_BACKGROUND} className='phone-background' />
                                <img src={PHONE} onClick={handleCall} className='phone-vector' />
                            </div>
                            <div>
                                <h4 className='contact-no'> +91 78019 67112 </h4>
                            </div>
                        </div>
                        <div className='phone'>
                            <div>
                                <img src={PHONE_BACKGROUND} className='phone-background' />
                                <img src={EMAIL} onClick={handleMail} className='email-vector' />
                            </div>
                            <div>
                                <h4 className='contact-no'> activ8flex.info@gmail.com </h4>
                            </div>
                        </div>
                    </div>
                    <div className='second-div-contact'>
                        <h1>For any queries please connect here!!</h1>
                        <div className='second-div-contact-text'>
                            <div>
                                <input value={contact.name}  name='name'  onChange={handleChange} className='text-contact' type='text' placeholder='Enter your name' />
                            </div>
                            <div className='contact-us-email'>
                                <input value={contact.email} name='email' onChange={handleChange} className='email-contact' type='email' placeholder='Enter your email' />
                            </div> 
                        </div> 
                        <div>
                            <textarea value={contact.question} name='question'  onChange={handleChange} className='textarea-contact' placeholder='Write your question here...' rows={5} cols={25} />
                        </div>
                        <div>
                            <button onClick={ContactUS} className='btn-submit-contact'>Submit</button>
                        </div>
                    </div>
                </div>

                <div>
                    <img src={MAP} className='contact-map' />
                </div>
            </div>
        </>
    );
}

export default ContactUS;
