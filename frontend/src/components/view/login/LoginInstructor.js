import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../../../assets/image/yoga/Login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginInstructorRoute } from "../../../utils/APIRoutes";
import { authKey } from "../../Common/constans.js";
import { CometChat } from "@cometchat-pro/chat";
import './style.css'

const LoginInstructor = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("Instructor")) {
      navigate("/instructor/chat");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email } = values;
      const { data } = await axios.post(loginInstructorRoute, {
        email,
        password,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      } else {
        if (data.status === true)
          CometChat.login(data.instructor._id, authKey).then(
            (user) => {
              console.log("Login Successful:", { user });
            },
            (error) => {
              console.log("Login failed with exception:", { error });
            }
          );
        localStorage.setItem("Instructor", JSON.stringify(data.instructor));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        toast.success(data.message, toastOptions);
        navigate("/instructor/chat");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (password === "") {
      toast.error("Password required!", toastOptions);
      return false;
    } else if (email.length === "") {
      toast.error("email required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="container-login-main">
        <div className="content-login">
          <div className="form-group">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1>Instructor Login</h1>
              <p className="login-p">
                Hey, Enter your detail to get sign into your account
              </p>

              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <input
                      type="email"
                      className="form-controls contact"
                      placeholder="Enter your email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      min="3"
                    />
                    <i
                      className="fa fa-user fa-lg fa-fw login"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="inputWithIcon">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                  <i className="fas fa-lock"></i>
                </div>
              </div>

              <Link className="forget-pwd-link" to={"http://localhost:3000/instructor/forget-password"}>
                Forget Password?
              </Link>
              <br />
              
              <button className="btn">Login</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginInstructor;
