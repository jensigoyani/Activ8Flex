import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import  "./styles.css";

const InsResetPwd = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:8800/instructor/forget-password/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<>
			<div className="container-login-main">
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
		</>
	)
};

export default InsResetPwd;
