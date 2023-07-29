// import React, { useEffect, useState } from "react";
// import './style.css'
// import profile from '../../../assets/image/profile/man.png'
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Logout from "../logout/userLogOut";

// function UserProfile() {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();
//   const [currentUser, serCurrentuser] = useState({})

//   useEffect(() => {
//     const navigationTo = async () => {
//       if (!localStorage.getItem('user')) {
//         navigate("/login");
//       }
//     }
//     navigationTo();
//   }, [navigate]);

//   const getUser = async () => {
//     const response = await axios.get(`http://localhost:8800/user/users/${user._id}`);
//     const details = (response.data);
//     serCurrentuser(details)
//   };
//   useEffect(() => {
//     getUser();
//   }, []);
//   return (
//     <div className="container-profile-user">
//       <div className="img-bxu">
//         <img className="profile-img" src={profile} alt="profile.jpg" />
//       </div>
//       <div className="user-profile-data">
//         <div className="detail">
//           <h1>{currentUser.username}</h1>
//           <p className='instructor-data'>Email : <span>{currentUser.email}</span></p>
//         </div><br></br>
//         <div>
//           <button className="profile-button">
//             <Link
//               to={`/user/edit/${currentUser._id}`}
//               className="button is-info is-small mr-1"
//             >
//               <i className="fab fa-solid fa-pen-to-square btn-profile" id="profile-icon" data-toggle="tooltip" title="Edit"></i>
//             </Link>
//             <Logout />
//           </button>
//         </div>
//       </div>
//       <div>
//         <NavLink to={'/reset-password'}> Reset Password </NavLink>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;


import React from 'react';
import profile from '../../../assets/ACTIV8FLEX/PROFILE.png';
import './style.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [currentUser, serCurrentuser] = useState({})

  useEffect(() => {
    const navigationTo = async () => {
      if (!localStorage.getItem('user')) {
        navigate("/login");
      }
    }
    navigationTo();
  }, [navigate]);

  const getUser = async () => {
    const response = await axios.get(`http://localhost:8800/user/users/${user._id}`);
    const details = (response.data);
    serCurrentuser(details)
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className='profile-body'>
      <div className='profile-header'>
        <div className='Pheader' >
          <img src={profile} alt='profile' />
          <i className="fa fa-share-alt " style={{ color: "#fff", fontSize: "30px", marginLeft: "90px", marginTop: "15px" }}></i>
        </div>
      </div>
      <div className='profile-info'>
        <h1>{currentUser.username}</h1>
        <p className='user-data'>E-mail :  <span>{currentUser.email}</span></p>
        <p className='user-data'>Contact No :  <span>{currentUser.contact}</span></p>
        <div className='profile-reset'>
          <NavLink to={'/reset-password'}> Change Password </NavLink>
        </div>
        <div className='profile-reset'>
          <NavLink to={'/user/edit/${currentUser._id}'}> Edit </NavLink>
        </div>
        <div>
          <NavLink to={'/login'} onClick={handleClick}>Log OUT</NavLink>
        </div>
      </div>

    </div>
  );
}