import React, { useEffect, useState } from "react";
import "./classes.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import meditation from './Meditation.json'
export default function Classes() {

    const [activeSection, setActiveSection] = useState('allclass');
    const [videos, setVideos] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

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

    useEffect(() => {
        const allVideo = async () => {
            const data = await axios.get('https://musclewiki.p.rapidapi.com/exercises', {
                params: {
                    length: 95
                    // category: "TRX",
                },
                headers: {
                    'X-RapidAPI-Key': '7ef6ff3eedmshca7edd8b41bcda7p116d37jsn0328fce08ef7',
                    'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
                },
            })
            const AllVideos = data?.data?.slice(0, 70)
            setAllVideos(AllVideos);
        }
        allVideo()

        const yogaVideo = async () => {
            const data = await axios.get('https://musclewiki.p.rapidapi.com/exercises', {
                params: {
                    category: 'Yoga'
                },
                headers: {
                    'X-RapidAPI-Key': '7ef6ff3eedmshca7edd8b41bcda7p116d37jsn0328fce08ef7',
                    'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
                }
            })
            setVideos(data?.data);

        }
        yogaVideo()
        console.log(meditation);
    }, []);

    // all videos
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const allItems = allVideos.slice(indexOfFirst, indexOfLast);

    const allClassesPageNumber = [];
    for (let i = 1; i <= Math.ceil(allVideos.length / itemsPerPage); i++) {
        allClassesPageNumber.push(i);
    }

    const renderAllPageNumber = allClassesPageNumber.map(number => {
        return (
            <li key={number}>
                <button onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            </li>
        );
    });

    // yoga videos
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = videos.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videos.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {

        return (
            <li key={number}>
                <button onClick={() => setCurrentPage(number)} >
                    {number}
                </button>
            </li>
        );
    });

    return (
        <>
            <div className="mainClasses">
                <div className="overlayClasses"></div>
                <div className="contentClasses">
                    <h1>Classes</h1>
                </div>
            </div>
            <div className="classesTab">
                <h1>OUR CLASSES</h1>
                <ul className="ul">
                    <li className={activeSection === 'allclass' ? 'active' : ''} ><a href="#allclass" onClick={(e) => handleLinkClick(e, 'allclass')}>All Classes</a></li>
                    <li className={activeSection === 'yogaclass' ? 'active' : ''} ><a href="#yogaclass" onClick={(e) => handleLinkClick(e, 'yogaclass')}>Yoga Classes</a></li>
                    <li className={activeSection === 'meditationclass' ? 'active' : ''} ><a href="#meditationclass" onClick={(e) => handleLinkClick(e, 'meditationclass')}>Meditation Classes</a></li>
                </ul>
                <section className="ClassesSection yogaclasses" id="allclass" style={{ display: activeSection === 'allclass' ? 'block' : 'none' }}>
                    <h2>All Classes</h2>
                    <div className="videos">
                        {allItems.map((v, index) => {
                            return (
                                <div className="VideoSection" key={v.id}>
                                    <video src={v.videoURL[0]} muted className="videoURL" />
                                    <a className="videoPlay" href={v.videoURL[0]} target="_blank" rel="noreferrer" >{v.Category}</a>
                                    <p>{v.exercise_name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <ul id="page-numbers" className="pagination">
                        {renderAllPageNumber}
                    </ul>
                </section>

                <section className="ClassesSection yogaclasses" id="yogaclass" style={{ display: activeSection === 'yogaclass' ? 'block' : 'none' }}>
                    <h2>Yoga Classes</h2>
                    <div className="videos">
                        {currentItems.map((v) => {
                            return (
                                <div className="VideoSection" key={v.id}>
                                    <video src={v.videoURL[0]} muted className="videoURL" />
                                    <a className="videoPlay" href={v.videoURL[0]} target="_blank" rel="noreferrer" >{v.Category}</a>
                                    <p>{v.exercise_name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <ul id="page-numbers" className="pagination" length={5} >
                        {renderPageNumbers}
                    </ul>
                </section>

                <section className="ClassesSection yogaclasses" id="meditationclass" style={{ display: activeSection === 'meditationclass' ? 'block' : 'none' }}>
                    <h2>Meditation Classes</h2>
                    <div className="videos">
                        {meditation.map((v, index) => {
                            return (
                                <div className="VideoSection" key={v.id}>
                                    <iframe width="560" height="315" src={v.videoURL} className="videoURL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                    <a className="videoPlay" href={v.videoURL} target="_blank" rel="noreferrer" >{v.Category}</a>
                                    <p>{v.exercise_name}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}