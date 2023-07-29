import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import Sidebar from '../../admin/Sidebar';
import Navbar from '../../admin/Navbar';

const AdminChangePwd = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState({})
	const [warning, setWarning] = useState("");
	const [admin, setAdmin] = useState(undefined)

	useEffect(() => {
		setAdmin(JSON.parse(localStorage.getItem('admin')));
	}, [])

	const handleSubmit = (e, id) => {
		e.preventDefault()
		setWarning("")
		const token = localStorage.getItem('accessToken');
		axios.put(`http://localhost:8800/admin/change-password/${admin?._id}`, value, token && {
			headers: {
				"accessToken": token
			}
		})
			.then(result => {
				setValue({ currentPassword: "", newPassword: "", confirmPassword: "" })
				alert("Password Updated Successfully...!!")
				navigate("/admin/home")
			})
			.catch(err => {
				setWarning(err.response.data)
			})
	}

	const handleChange = (key, value) => {
		setValue((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<>
			<Navbar />
			<div className="main-container">
				<Sidebar />
				<div className="container-ins-login-main">
					<div className="content-login">
						<div className="form-group">
							<form onSubmit={handleSubmit}>
								<h1>Reset Password</h1>
								<div className="contact-detail">
									<div className="form-group emailId">
										<div className="inputWithIcon">
											<input
												type="password"
												className="form-controls"
												placeholder='Current Password'
												name="currentPassword"
												value={value.currentPassword}
												onChange={(e) => handleChange("currentPassword", e.target.value)}
											/>
											<i className="fas fa-lock"></i>
										</div>
									</div>
								</div>
								<div className="contact-detail">
									<div className="form-group emailId">
										<div className="inputWithIcon">
											<input
												type="password"
												className="form-controls"
												placeholder='New Password'
												name="newPassword"
												value={value.newPassword}
												onChange={(e) => handleChange("newPassword", e.target.value)}
											/>
											<i className="fas fa-lock"></i>
										</div>
									</div>
								</div>
								<div className="contact-detail">
									<div className="form-group emailId">
										<div className="inputWithIcon">
											<input
												type="password"
												className="form-controls"
												placeholder='Re-new Password'
												name="confirmPassword"
												value={value.confirmPassword}
												onChange={(e) => handleChange("confirmPassword", e.target.value)}
											/>
											<i className="fas fa-lock"></i>
										</div>
									</div>
								</div>
								<button className="btn">RESET</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminChangePwd
