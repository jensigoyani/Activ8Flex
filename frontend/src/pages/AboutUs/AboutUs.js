import React from 'react';
import './AboutUs.css'
import facilitesAbout from "../../assets/ACTIV8FLEX/FACLITIES.png"
import teamAbout from '../../assets/ACTIV8FLEX/ABOUT_TRAINER.png'
import teamInfo from '../../assets/ACTIV8FLEX/ABOUT_LEAF.png'
import mission from "../../assets/ACTIV8FLEX/ABOUT_MISSION.png"

function AboutUs() {
    return (
        <div className='About'>
            <div className="mainAbout">
                <div className="overlay"></div>
                <div className="contentAbout">
                    <h1>About Us</h1>
                    <p>ACTIV8Flex is not just a fitness club, it's a perfect place to start
                        your healthy life, get fit, and become stronger.</p>
                    <p>Our Yoga and Meditation are designed to meet individual needs.
                        We'll teach you how to change and get more out of yourself.</p>
                </div>
            </div>
            <div className="faciliteSection">
                <h1>OUR FACILITIES</h1>
                <p>Among our members, there are office workers and stay-at-home moms, grandparents, handicap person.</p>
                <div className='facilites'>
                    <ul className='facilitesList'>
                        <li>Personal Video</li>
                        <li> Chat</li>
                        <li> Customized Personal training</li>
                        <li> Book an Appointment</li>
                        <li> Yoga classes</li>
                        <li> Meditation classes</li>
                        <li> Weekly schedule</li>
                    </ul>
                    <div className='imageFacilites'>
                        <img src={facilitesAbout} alt='facilites' className='imgFacilites' />
                    </div>
                </div>
            </div>
            <div className='aboutTeamSection'>
                <div className='imageTeams'>
                    <img src={teamAbout} alt='team' className='imgTeam' />
                </div>
                <div className='teamInfo'>
                    <img src={teamInfo} alt='teamInfo' className='imageTeamInfo' />
                    <h1>We've Developed A Personal Health Team That You Can Take With You Anywhere.</h1>
                    <p>We make it effortless to master your health and life by creating a tailored transformation program just for you... and keeping you on track with daily 1-on-1 online coaching and support.</p>
                </div>
            </div>
            <div className='aboutMission'>
                <div className='mission'>
                    <h1>OUR MISSION</h1>
                    <div className='missionInfo'>
                        <img src={teamInfo} alt='missionInfo' className='imageMissionInfo' />
                        <p>Our mission is to make yoga and meditation accessible to everyone, regardless of their location or experience level. Whether you are a beginner or an experienced yogi, our platform has something for everyone. Our video calling feature allows you to connect with an instructor from the comfort of your own home, while our chat feature lets you ask questions and get support in real-time.</p>
                        <p>Our mission is to help you succeed. Whether your goal is to be extremely fit while balancing family life and work, or to climb the Mount Everest, ACTIV8Flex is the catalyst to get you there.</p>
                        <p>We believe in hard work, community, and progress. Come try a free session and see why ACTIV8Flex is the place to help you reach your fitness goals!</p>
                    </div>
                    <div>
                        <img src={mission} alt='mission.jpg' className='imgMission' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;