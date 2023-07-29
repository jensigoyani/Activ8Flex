import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const InstructorList = () => {
  const [instructors, setInstructor] = useState([]);
  const [serachInput, setSerachInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getInstructors();
  }, []);

  const getInstructors = async () => {
    const response = await axios.get(
      "http://localhost:8800/instructor/instructors"
    );
    setInstructor(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/instructor/instructors/${id}`);
      getInstructors();
    } catch (error) {
      console.log(error);
    }
  };

  const serachIns = (searchValue) => {
    setSerachInput(searchValue);
    if (serachInput !== "") {
      const filteredData = instructors.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(serachInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(instructors);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = instructors.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(instructors.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number}>
        <button onClick={() => setCurrentPage(number)}>{number}</button>
      </li>
    );
  });
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="container-xl">
          <div className="column is-half">
            <br />
            <br />
            <div className="add-ins">
              <h1 className="admin-h1">Instructor Management</h1>
              <button className="btn-add-instructor">
                <Link
                  className="add-ins-link"
                  to={`/admin/instructor/list/add`}
                >
                  {" "}
                  Add Instructor{" "}
                </Link>
              </button>
            </div>
            <div className="searchbar">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => serachIns(e.target.value)}
              />
            </div>
            <table className="table is-striped is-fullwidth mt-2 table-ins">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Qualification</th>
                  <th>Experience (year)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {serachInput.length > 1
                  ? filteredResults.map((instructor, index) => {
                      return (
                        <tr key={instructor._id}>
                          <th>{index + 1}</th>
                          <td>{instructor.name}</td>
                          <td>{instructor.email}</td>
                          <td>{instructor.phone}</td>
                          <td>{instructor.qualification}</td>
                          <td>{instructor.experience}</td>
                          <td className="edit">
                            <Link
                              to={`/admin/instructors/list/edit/${instructor._id}`}
                              className="button is-info is-small mr-1"
                            >
                              <i
                                className="fab fa-solid fa-pen-to-square edit-btn"
                                data-toggle="tooltip"
                                title="Edit"
                              ></i>
                            </Link>
                            <button
                              onClick={() => deleteUser(instructor._id)}
                              className="delete"
                            >
                              <i
                                className="fab fa-solid fa-trash"
                                data-toggle="tooltip"
                                title="Delete"
                              ></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : instructors &&
                    currentItems.map((instructor, index) => (
                      <tr key={instructor._id}>
                        <th>{index + 1}</th>
                        <td>{instructor.name}</td>
                        <td>{instructor.email}</td>
                        <td>{instructor.phone}</td>
                        <td>{instructor.qualification}</td>
                        <td>{instructor.experience}</td>
                        <td className="edit">
                          <Link
                            to={`/admin/instructors/list/edit/${instructor._id}`}
                            className="button is-info is-small mr-1"
                          >
                            <i
                              className="fab fa-solid fa-pen-to-square edit-btn"
                              data-toggle="tooltip"
                              title="Edit"
                            ></i>
                          </Link>
                          <button
                            onClick={() => deleteUser(instructor._id)}
                            className="delete"
                          >
                            <i
                              className="fab fa-solid fa-trash"
                              data-toggle="tooltip"
                              title="Delete"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <ul id="page-numbers" className="pagination">
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorList;
