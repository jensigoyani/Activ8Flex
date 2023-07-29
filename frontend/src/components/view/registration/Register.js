import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../../../utils/APIRoutes";
import { CometChat } from "@cometchat-pro/chat";
import { authKey } from "../../Common/constans.js";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const ref = useRef()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    gender: "",
    dob: "",
    common_illnesses: "",
    profile_pic: "",
    Ins_id: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/instructor/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const {
        password,
        username,
        email,
        contact,
        gender,
        dob,
        common_illnesses,
        profile_pic,
        Ins_id,
      } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        contact,
        gender,
        dob,
        common_illnesses,
        profile_pic,
        password,
        Ins_id,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      } else {
        if (data.status === true) {
          const name = data.user.username;
          const uid = data.user._id;
          let metadata = {
            email: data.user.email,
            instructor: {
              instructorId: data?.user?.Ins_id._id,
              instructorName: data?.user?.Ins_id.name,
              instructorEmail: data?.user?.Ins_id.email,
            }
          };
          console.log(metadata, 'khushali');
          var user = new CometChat.User(uid);
          user.setName(name);
          user.setMetadata(metadata);
          user.setTags(["user"]);
          CometChat.createUser(user, authKey).then(
            (user) => {
              console.log("user create Successful:", { user });
            },
            (error) => {
              console.log("failed:", { error });
            }
          );
        }
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/login");
    }
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Enter correct Confirm Password!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be atleast 3 characters.", toastOptions);
      return false;
    } else if (password.length < 4) {
      toast.error("Password must be atleast 4 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="container-register-main">
        <div className="content-register">
          <div className="form-group">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1>SIGN UP</h1>
              <p className="register-p">
                Hey, Enter your detail to get your account
              </p>

              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <input
                      type="text"
                      className="form-controls contact"
                      placeholder="Username"
                      name="email"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fa fa-user fa-lg fa-fw login" aria-hidden="true"></i>
                  </div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <input
                      type="text"
                      className="form-controls"
                      placeholder="Enter your Email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fa fa-envelope fa-lg fa-fw mail" aria-hidden="true"></i>
                  </div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="form-group contact">
                  <div className="inputWithIcon">
                    <input
                      type="text"
                      className="form-controls"
                      placeholder="Contact No."
                      name="phone"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fa fa-phone fa-lg fa-fw" aria-hidden="true"></i>
                  </div>
                </div>
              </div>

              <div className="form-groups gender">
                <label className="gen-label" htmlFor="">
                  Gender :
                </label>
                <input
                  type="radio"
                  className="gender-control"
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  value="male"
                />{" "} {" "}
                Male
                <input
                  type="radio"
                  className="gender-control"
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  value="female"
                />{" "} {" "}
                Female
                <input
                  type="radio"
                  className="gender-control"
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  value="other"
                /> {" "} {" "}
                Other
              </div>

              <div className="contact-detail">
                <div className="form-group contact">
                  <div className="inputWithIcon">
                    <input
                      placeholder="Enter your DOB"
                      type="text"
                      ref={ref}
                      onFocus={() => (ref.current.type = "date")}
                      className="form-controls"
                      name="date"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="form-group">
                  <div className="inputWithIcon">
                    <input
                      className="register-pwd"
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fas fa-lock pwd"></i>
                  </div>
                </div>
              </div>

              <div className="contact-detail">
                <div className="form-group">
                  <div className="inputWithIcon">
                    <input
                      className="register-cpwd"
                      type="password"
                      placeholder="Confirm Password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                    <i className="fas fa-lock cpwd"></i>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="inputWithIcon">
                  <select className="form-controls dropdowns" name="Ins_id"
                    value={values.Ins_id} id="instructors" onChange={(e) => handleChange(e)}  >
                    <option>---select Instructor---</option>
                    {instructors.map((instructor) => {
                      return (
                        <option key={instructor._id} value={instructor.name}>
                          {instructor.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-register">
                Sign Up
              </button>

              <div>
                <p className="signup-login-p">
                  Don't have an Account?
                  <Link className="sign-up-link" to={"http://localhost:3000/login"}>
                    Sign In
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div >
      </div >
      <ToastContainer />
    </>
  );
};
export default Register;