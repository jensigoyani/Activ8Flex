import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../../../utils/APIRoutes";
import { authKey } from "../../Common/constans.js";
import { CometChat } from "@cometchat-pro/chat";

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      } else {
        CometChat.login(data.user._id, authKey).then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        toast.error(data.message, toastOptions);
        navigate("/pricing");
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
      toast.error("Username required", toastOptions);
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
              <h1>Login</h1>
              <p className="login-p">
                Hey, Enter your detail to get sign into your account
              </p>

              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <input
                      type="email"
                      className="form-controls contact"
                      placeholder="Enter your Email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fa fa-envelope fa-lg fa-fw mail contact-email" aria-hidden="true"></i>
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
              <div>

                <Link className="forget-pwd-link" to={"http://localhost:3000/forget-password"}>
                  Forget Password?
                </Link>
              </div>
              <button className="btn">Login</button>
              <div>
                <p className="signup-login-p">
                  Already have an Account?
                  <Link className="sign-up-link" to={"http://localhost:3000/register"}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
