import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { adminlogin, loginRoute } from "../../../utils/APIRoutes";

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
      const { data } = await axios.post(adminlogin, {
        email,
        password,
      });
      if (data.status === true) {
        toast.success("Login successful!", toastOptions)
        localStorage.setItem("admin", JSON.stringify(data.admin));
        navigate("/admin/home");
      } else {
        toast.error(data.msg, toastOptions);
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
              <h1>Admin Login</h1>

              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <input
                      type="email"
                      className="form-control txt"
                      placeholder="Username"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      min="3"
                    />
                    <i className="fa fa-user fa-lg fa-fw login" aria-hidden="true"></i>
                  </div>
                </div>
              </div>


              <div className="contact-detail">
                <div className="form-group">
                  <div className="inputWithIcon">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fas fa-lock pwd"></i>
                  </div>
                </div>
              </div>

              <div>
                <Link className="forget-pwd-link" to={"http://localhost:3000/forget-password"}>
                  Forget Password?
                </Link>
              </div>

              <button className="btn">Login</button>

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
