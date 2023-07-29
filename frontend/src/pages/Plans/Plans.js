import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInvoice, getKey, payInvoice } from "../../utils/APIRoutes";
import TICK from "../../assets/ACTIV8FLEX/TICK.png"
import CANCEL from "../../assets/ACTIV8FLEX/CANCEL.png"
import "./Plans.css";

const Plans = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState({});

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem('user')))
    console.log(JSON.parse(localStorage.getItem('user')))
  }, []);

  function handlePayMonthly() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      setUsername(JSON.parse(localStorage.getItem('user')))
      try {
        setLoading(true);
        const result = await axios.post(createInvoice, {
          amount: 300 * 100,
          email: username.email
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(getKey);

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'ACTIV8Flex',
          description: '',
          order_id: order_id,
          email: username.email,
          username: username.username,
          contact: username.contact,
          handler: async function (response) {
            const result = await axios.post(payInvoice, {
              username: username.username,
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              emailId: username.email,
              contact: username.contact
            });
            console.log(result.data);
            navigate('/payment/success')
          },
          prefill: {
            name: username.username,
            email: username.email,
            contact: username.contact,
          },
          notes: {
            address: '',
          },
          theme: {
            color: '#80c0f0',
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  function handlePayAnnually() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      setUsername(JSON.parse(localStorage.getItem('user')))
      try {
        setLoading(true);
        const result = await axios.post(createInvoice, {
          amount: 3000 * 100,
          email: username.email
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(getKey);

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'ACTIV8Flex',
          description: '',
          order_id: order_id,
          email: username.email,
          username: username.username,
          contact: username.contact,
          handler: async function (response) {
            const result = await axios.post(payInvoice, {
              username: username.username,
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              email: username.email,
              contact: username.contact
            });
            console.log(result.data);
            navigate('/payment/success')
          },
          prefill: {
            name: username.username,
            email: username.email,
            contact: username.contact,
          },
          notes: {
            address: '',
          },
          theme: {
            color: '#80c0f0',
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <>
      <div className="About">
        <div className="mainMembership">
          <div className="overlay"></div>
          <div className="contentPlans">
            <h1>Membership Option</h1>
            <p>Our nationally certified trainers are here to help
              you get into shape easier and faster than ever.</p>
          </div>
        </div>
      </div>
      <div className="main-div">
        <div className="button-div">
          <button className="monthly">Monthly</button>
          <span className="annually">Annually</span>
        </div>
        <div className="membership-quote">
          <h3>In your 1-1 private  training you will be working directly with
            ACTIVE8Flex Fitness professional</h3>
        </div>
        <div className="main-box-div">
          <div className="box-monthly">
            <div className="first-month-div">
              <div className="month-text">
                Rs 300
              </div>
              <div className="per-month-text">
                /per month
              </div>
              <div className="month-button">
                <button onClick={() => {
                  !localStorage.getItem("user")
                    ? navigate("/login")
                    : handlePayMonthly();
                }}>Sign Up Now</button>
              </div>
            </div>
            <div className="second-month-div">
              <div>
                <h4 className="desc-month"><span><img src={TICK} /></span> Personal Trainer </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Premium Video </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Schedule Training </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Appointment Schedule </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Personal Plan </h4>
                <h4 className="desc-month-cancel"><span><img src={CANCEL} /></span> Get more Discounts </h4>
              </div>
            </div>
          </div>
          <div className="box-annually">
            <div className="first-month-div">
              <div className="month-text">
                Rs 3000
              </div>
              <div className="per-month-text">
                /per year
              </div>
              <div className="month-button">
                <button onClick={() => {
                  !localStorage.getItem("user")
                    ? navigate("/login")
                    : handlePayAnnually();
                }}>Sign Up Now</button>
              </div>
            </div>
            <div className="second-month-div">
              <div>
                <h4 className="desc-month"><span><img src={TICK} /></span> Personal Trainer </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Premium Video </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Schedule Training </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Appointment Schedule </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Personal Plan </h4>
                <h4 className="desc-month"><span><img src={TICK} /></span> Get more Discounts </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;