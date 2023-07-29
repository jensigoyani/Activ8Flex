import React, { useEffect, useState } from 'react'
import './WeeklySchedule.css'
import { useNavigate } from 'react-router-dom';

const WeeklySchedule = () => {
    const [activeSection, setActiveSection] = useState('allschedule');

    const navigate = useNavigate();

    useEffect(() => {
        const navigationTo = async () => {
            if (!localStorage.getItem('user')) {
                navigate("/login");
            }
        }
        navigationTo();
    }, [navigate]);


    function handleLinkClick(e, sectionId) {
        e.preventDefault();
        setActiveSection(sectionId);
    }

    return (
        <>
            <div className="mainSchedule">
                <div className="overlay"></div>
                <div className="contentSchedule">
                    <h1>Schedule & Events</h1>
                    <p>We are open 7 days a week! You get your own access
                        code, your freedom to work out anytime!</p>
                    <p>Our instructor can help you to select the best classes
                        according to your needs and expectations.</p>
                </div>
            </div>
            <div className="classesTab">
                <h1>OUR Schedule</h1>
                <ul className='ul'>
                    <li className={activeSection === 'allschedule' ? 'active' : ''} ><a href="#allschedule" onClick={(e) => handleLinkClick(e, 'allschedule')}>All Classes</a></li>
                    <li className={activeSection === 'yogaschedule' ? 'active' : ''} ><a href="#yogaschedule" onClick={(e) => handleLinkClick(e, 'yogaschedule')}>Yoga Classes</a></li>
                    <li className={activeSection === 'meditationschedule' ? 'active' : ''} ><a href="#meditationschedule" onClick={(e) => handleLinkClick(e, 'meditationschedule')}>Meditation Classes</a></li>
                </ul>
                <section id="allschedule" style={{ display: activeSection === 'allschedule' ? 'block' : 'none' }}>
                    <div className="container-schedule">
                        <div className="schedule-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th className="last">Saturday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time">4.00 AM</td>
                                        <td className="active">
                                            <h4>Weight Loss</h4>
                                            <p>04 am - 05 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Spinning</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Body Building</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Racing</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="time">5.00 AM</td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Cycling</h4>
                                            <p>05 am - 06am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Boot Camp</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="time">6.00 AM</td>
                                        <td className="active">
                                            <h4>Yoga</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>karate</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Dance</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Energy Blast</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Aerobics</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">7.00 AM</td>
                                        <td className="active">
                                            <h4>Boxing</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Crossfit</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Boot Camp</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Body Building</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Cycling</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">8.00 AM</td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Boxercise</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Health</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Jumping</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section id="yogaschedule" style={{ display: activeSection === 'yogaschedule' ? 'block' : 'none' }}>
                    <div className="container-schedule">
                        <div className="schedule-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th className="last">Saturday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time">4.00 AM</td>
                                        <td className="active">
                                            <h4>Strength & Flexibility</h4>
                                            <p>04 am - 05 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Yoga & Cardio</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Rest Day</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Motion is Lotion</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="time">5.00 AM</td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Feel Good Flow</h4>
                                            <p>05 am - 06am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Pwoer Yoga</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="time">6.00 AM</td>
                                        <td className="active">
                                            <h4>Yoga For Balance</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Power Vinyasa</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Gental Yoga</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Fat burning Yoga</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Core Strength</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">7.00 AM</td>
                                        <td className="active">
                                            <h4>Seated Yoga</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Improve Your Balance</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Energizing Yoga</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Morning Flow</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Yoga Detox</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">8.00 AM</td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Gentle Yoga</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Total Body Yoga</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Core Strength Yoga</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section id="meditationschedule" style={{ display: activeSection === 'meditationschedule' ? 'block' : 'none' }}>
                    <div className="container-schedule">
                        <div className="schedule-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th className="last">Saturday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time">4.00 AM</td>
                                        <td className="active">
                                            <h4>relieve stress</h4>
                                            <p>04 am - 05 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>reduce anxiety</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>increase focus</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>improve cognition</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="time">5.00 AM</td>
                                        <td></td>
                                        <td className="active">
                                            <h4>reduce tobacco cravings</h4>
                                            <p>05 am - 06am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>improve your pain response</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="time">6.00 AM</td>
                                        <td className="active">
                                            <h4>control high blood pressure</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>reduce inflammation</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>inner stillness and peace</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>depression</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>stress</h4>
                                            <p>06 am - 07 am</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">7.00 AM</td>
                                        <td className="active">
                                            <h4>counting your breaths</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Vipassana Meditation</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Yoga Meditation</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Transcendental Meditation</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Mindfulness Meditation</h4>
                                            <p>07 am - 08 am</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">8.00 AM</td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>Guided Meditation</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td className="active">
                                            <h4>Loving-Kindness</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="active">
                                            <h4>awareness</h4>
                                            <p>08 am - 09 am</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default WeeklySchedule