import React, { useState } from "react";
import "./Home.css";
import data from "../../components/Helpers/data.json";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/repetedComponents/Button";
import Testimonial from "../../components/Helpers/Testimonials";
import leaf from '../../assets/ACTIV8FLEX/LEAF.png'
import heroBanner from '../../assets/ACTIV8FLEX/ACTIV8FLEX_HERO_BANNER_FRONT_HERO.png'
import appointment from "../../assets/ACTIV8FLEX/APPOINTMENT.png"
import appointmentLeaf from "../../assets/ACTIV8FLEX/APPOINTMENT_LEAF.png"
import yogaTrainingLeaf from "../../assets/ACTIV8FLEX/YOGA_LEAF.png";
import yogaTrainingImage from "../../assets/ACTIV8FLEX/HOME_YOGA_TRAIN.png"
import trainer from "../../assets/ACTIV8FLEX/TRAINER.png"

const Home = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate("/appointment");
  };

  const onHandleClick = () => {
    navigate("/pricing");
  };
  const onTrainingClick = () => {
    if (localStorage.getItem("user")) {
      navigate("/classes");
    } else {
      navigate("/pricing");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="main-home">
        <div className="bgimg"></div>
        <div className="text-home">
          <h1 className="h1-home">Find Your Balance <br /> with Activ8Flex</h1>
          <br />
          <p className="p-home">
            Your Home for Online Meditation and Yoga. Our professional
            instructors will help you stay active and healthy.
          </p>
          <Button className="btn-trial" onClick={onHandleClick}>
            START YOUR JOURNEY
          </Button>
        </div>
        <div className="bgimg">
          <img src={leaf} className="leaf" />
          <img src={heroBanner} className="hero-banner" />
        </div>
      </div>

      <h2 className="h2-services">Our Services</h2>
      <div className="services">
        <section className="service-section">
          <span className="dot">
            <i id="service-icon" className="fas fa-solid fa-video"></i>
          </span>
          <h3 id="service-text">LIVE TRAINING SESSION</h3>
          <p className="service-p">
            We are proud to offer live training <br /> session with video call.
          </p>
        </section>
        <section className="service-section">
          <span className="dot">
            <i id="service-icon" className="fas fa fa-wechat"></i>
          </span>
          <h3 id="service-text">LIVE CHAT</h3>
          <p className="service-p">
            Communication with chat to our <br /> instructor.
          </p>
        </section>
        <section className="service-section">
          <span className="dot">
            <i id="service-icon" className="fas fa-solid fa-clock"></i>
          </span>
          <h3 id="service-text">AT HOME WORKOUTS</h3>
          <p className="service-p">
            Keep your results going strong with <br /> our easy-to-follow at home
            routines.
          </p>
        </section>
        <section className="service-section">
          <span className="dot">
            <i id="service-icon" className="fas fa-solid fa-walking"></i>
          </span>
          <h3 id="service-text">YOGA AND MEDIATION VIDEOS</h3>
          <p className="service-p">
            Achieve your fitness goals effectively <br />with our yoga and meditation
            video sessions.
          </p>
        </section>
        <section className="service-section">
          <span className="dot">
            <i id="service-icon" className="fas fa-solid fa-dumbbell"></i>
          </span>
          <h3 id="service-text">NO NEED FOR TRAINING EQUIPMENT</h3>
          <p className="service-p">
            Achieve your fitness goals effectively without any training
            equipment.
          </p>
        </section>
        <section className="service-section">
          <span className="dot">
            <i id="service-icon" className="fas fa-solid fa-fire-alt"></i>
          </span>
          <h3 id="service-text">CUSTOMIZED PERSONAL TRAINING</h3>
          <p className="service-p">
            Our workouts and training programs <br />  are designed for each individual <br />
            client. You'll get personal training, <br />made just for you.
          </p>
        </section>
      </div>

      <section className="appointment-section">
        <div className="appointment-main-div">
          <div className="bgimg-app"></div>
          <div className="appointment-sec-div">
            <h1>MAKE AN APPOINTMENT <br /> TODAY </h1>
            <h3>
              Unlock Your Potential with a Personalized Wellness Experience
            </h3>
            <h4>
              Take the first step towards a healthier and happier <br /> you by booking
              a personal appointment with one <br />of our experienced wellness
              specialists today.
            </h4>
            <button className="btn-app" onClick={nextPage}>
              TAKE AN APPOINTMENT
            </button>
          </div>
          <div>
            <img className='appointment-leaf' src={appointmentLeaf} />
            <img src={appointment} className="appointment-img" alt="image" />
          </div>
        </div>
      </section>

      <section className="yoga-training">
        <div className="yoga-training-main-div">
          <div>
            <img className="about-yoga-leaf" src={yogaTrainingLeaf} alt="" />
            <img src={yogaTrainingImage} className="about-yoga-train" />
          </div>
          <div className="about-yoga-details">
            <h1>YOGA TRAINING</h1>
            <h3>Maximum results and flexible training schedule.</h3>
            <h4>
              If you want to train 1-on-1, Activ8Flex offers you personal <br /> training to
              work on your individual skills and achieve <br />fitness goals. Our
              personal trainers are dedicated to <br /> providing you with the best
              fitness experience <br /> possible.
            </h4>
            <Button className="btn-training">
              <Link className="Link-training" to="/classes">
                EXPLORE TRAINING
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="trainer-home">
        <div className="trainer-main-div">
          <h1> PRO TRAINERS, CAPTIVATING PERSONALITIES </h1>
          <h3> Our superstar trainers are the best in the business. Handpicked from 140,000 <br />
            world-leading Activ8Flex instructors, these inspiring fitness leaders deliver <br />
            unparalleled motivation and results
          </h3>
          <div>
            <img className="trainer-home" style={{
              marginLeft: "210px"
            }} src={trainer} />
          </div>
        </div>
      </section>

      <section className="section-slider">
        <Testimonial testimonialData={data} />
      </section>
    </>
  );
};

export default Home;
