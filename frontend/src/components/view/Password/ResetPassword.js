import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const ResetPassword = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:8800/user/forget-password/${param.id}/${param.token}`;

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
			{validUrl ? (
				<div className="container-login-main">
					<div className="content-login">
						<div className="form-group">
							<form onSubmit={handleSubmit}>
								<h1>Add New Password</h1>
								<div className="contact-detail">
									<div className="form-group emailId">
										<div className="inputWithIcon">
											<input
												type="password"
												placeholder="Password"
												name="password"
												onChange={(e) => setPassword(e.target.value)}
												value={password}
												required
												className='input'
											/>
										</div>
									</div>
								</div>
								{error && <div className='error_msg'>{error}</div>}
								{msg && <div className='success_msg'>{msg}</div>}
								<button type="submit" className="btn-register">
									Reset
								</button>
							</form>
						</div>
					</div>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default ResetPassword;
