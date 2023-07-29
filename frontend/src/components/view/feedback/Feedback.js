import React, { useState } from 'react';
import './style.css'
import axios from 'axios';
import Input from '../../repetedComponents/Input';
import Button from '../../repetedComponents/Button';
import { feedbackRoute } from '../../../utils/APIRoutes';

const Feedback = () => {
    const [review, setReview] = useState({
        name: "",
        email: "",
        feedback: ""
    })

    // handle on change
    const handleChange = e => {
        const { name, value } = e.target
        setReview({
            ...review,//spread operator 
            [name]: value
        })
    }
    const sendFeedback = () => {
        const { name, email, feedback } = review
        if (name && email && feedback) {
            axios.post(feedbackRoute, review)
                .then(res => console.log(res));
            alert('Sended your Feedback sucssesfully..!!')
        }
        else {
            alert("Fill all the feilds...!!")
        }
    }
    return (
        <div className='main-front'>
            <div className='feedback-main'>
                <header className='left-feedback'>
                    <h1 className='h1-feedback'>Feel free to drop your feedback.</h1>
                    <img className='feedback-img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/feedback-form-template.svg" alt="A woman is sitting on the floor and working on a laptop (vector illustration)" />
                </header>
                <div className='form-feedback'>
                    <form className='feedback-form'>
                        <h1 className='feedback-h1'>DROP HERE</h1>
                        <div>
                            <div className="inputWithIcon">
                                <input className='form-controls' type='text' name='name' value={review.name} onChange={handleChange} placeholder='name*' />
                                <i className="fa fa-user fa-lg fa-fw feedback" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div>
                            <div className="inputWithIcon">
                                <input className='form-controls inputBox' type='email' name='email' value={review.email} onChange={handleChange} placeholder='Email*' />
                            <i className="fa fa-envelope fa-lg fa-fw feedback" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div>
                            <div className="inputWithIcon">
                                <textarea className='form-controls' type='text' rows={5} name='feedback' value={review.feedback} onChange={handleChange} placeholder='Write your review here..*' />
                                <i class="fas fa-comment-alt"></i>
                            </div>
                        </div>
                        <div>
                            <Button className='btn-feedback btn' onClick={sendFeedback}>Send Review</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
