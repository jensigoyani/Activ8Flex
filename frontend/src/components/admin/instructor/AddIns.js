import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style.css";
import "../../view/registration/style.css"
import { useNavigate } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { authKey } from "../../Common/constans.js";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const AddIns = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    experience: "",
  });
  const navigate = useNavigate();

  const addIns = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, phone, qualification, experience, password } =
        values;
      await axios
        .post("http://localhost:8800/instructor/add-ins", {
          name,
          email,
          phone,
          qualification,
          experience,
          password,
        })
        .then((res) => {
          if (res.data.status === true) {
            navigate("/admin/instructors/list");
            const name = res.data.instructor.name;
            const uid = res.data.instructor._id;
            //add metadata
            let metadata = {
              email: res.data.instructor.email,
            };
            var user = new CometChat.User(uid);
            user.setName(name);
            user.setMetadata(metadata);
            user.setTags(["instructors"]);
            CometChat.createUser(user, authKey).then(
              (user) => {
                console.log("user create Successful:", { user });
              }
            );
          } else {
            navigate("/admin/instructors/list");
          }
        });
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error("Enter correct Confirm Password!", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Username must be atleast 3 characters.", toastOptions);
      return false;
    } else if (password.length < 10) {
      toast.error("Password must be atleast 10 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className=".container-ins-login-main ">
          <div className="content-register">
            <div className="form-group" style={{
              marginLeft: "304px",
              marginTop: "146px"
            }}>
              <form onSubmit={addIns} className="add-ins-form">
                <h1>Add Instructor</h1>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={(e) => handleChange(e)}
                        placeholder="Mobile number"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        className="form-control"
                        name="qualification"
                        onChange={(e) => handleChange(e)}
                        placeholder="Qualifivation"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        className="form-control"
                        name="experience"
                        onChange={(e) => handleChange(e)}
                        placeholder="Experience"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="form-group emailId">
                    <div className="inputWithIcon">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-register" style={{
                  marginLeft: "15px"
                }}>
                  Add Instructor
                </button>

              </form>
            </div>
          </div >
        </div >
      </div>
    </>
  );
};

export default AddIns;
