import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './BookApointMent.css'
import { userAppointmentRoute } from "../../../utils/APIRoutes";

const BookApointMent = () => {
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();
  const ref = useRef();
  const dateRef = useRef()

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    birthdate: "",
    weight: "",
    service: "",
    date: "",
    instructor: ""
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, phone, email, gender, birthdate, weight, service, date, instructor } = values;
      const { data } = await axios.post(userAppointmentRoute, {
        name,
        phone,
        email,
        gender,
        birthdate,
        weight,
        service,
        date,
        instructor
      });
      alert("Appointment Booked...!!")
      navigate('/')
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleValidation = () => {
    const { name, phone, email } = values;
    if (email === "" && name === "" && phone === "") {
      toast.error("Name, Email and Contact no are required!", toastOptions)
      return false
    } else if (phone === "") {
      toast.error("Contact required!", toastOptions)
      return false
    } else if (email.length === "") {
      toast.error("email required!", toastOptions)
      return false
    } else if (name === "") {
      toast.error("name required!", toastOptions)
      return false
    }
    return true
  }

  useEffect(() => {
    const instructorData = async () => {
      await axios
        .get("http://localhost:8800/instructor/instructors")
        .then((response) => {
          setInstructors(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    instructorData();
  }, []);

  return (
    <>
      <div className="container-appointment-main">
        <div className="content-appointment">
          <div className="form-group">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1 className="book-an-appointment">Book an Appointment</h1>
              <div className="inputWithIcon">
                <input
                  type="text"
                  className="form-controls"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  min="3"
                  placeholder="Your name"
                />
                <i className="fa fa-user fa-lg fa-fw appointment" aria-hidden="true"></i>
              </div>
              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <input
                      type="text"
                      className="form-controls"
                      placeholder="xyz@gmail.com"
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
              <div className="contact-detail">
                <div className="form-group emailId">
                  <div className="inputWithIcon">
                    <select className="form-controls dropdowns" name="gender" onChange={(e) => handleChange(e)}>
                      <option>---Select Gender---</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group dob">
                  <div className="inputWithIcon">
                    <input
                      placeholder="Enter your DOB"
                      type="text"
                      ref={dateRef}
                      onFocus={() => (dateRef.current.type = "date")}
                      className="form-controls"
                      name="date"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="inputWithIcon">
                  <select className="form-controls dropdowns" name="instructor" value={values.instructor} id="instructors" onChange={(e) => handleChange(e)}>
                    <option>---Select Instructor---</option>
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
              <div className="contact-detail">
                <div className="form-group contact">
                  <div className="inputWithIcon">
                    <select className="form-controls dropdowns" name="service" onChange={(e) => handleChange(e)}>
                      <option aria-readonly>---Select Service---</option>
                      <option>Yoga</option>
                      <option>Meditation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group contact">
                  <div className="inputWithIcon">
                    <input
                      placeholder="Appointment Date"
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

              <div className="form-group">
                <div className="inputWithIcon">
                  <input
                    type="text"
                    className="form-controls"
                    name="weight"
                    placeholder="Weight"
                    onChange={(e) => handleChange(e)}
                  />
                  <i className="fas fa-weight"></i>
                </div>
              </div>

              <button className="btn-appointment">Book</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BookApointMent;
