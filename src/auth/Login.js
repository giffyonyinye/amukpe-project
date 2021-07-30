import {useState} from "react";
import * as TiIcons from "react-icons/ti";
import * as ImIcons from "react-icons/im";
import {Link} from "react-router-dom";
import axios from "axios";
import community from "../assets/img/community.svg";
import "../assets/css/auth.css";

const Login = ({devApi, setUser, setToken}) => {

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const [acctError, setAcctError] = useState(false);
	const [proccess, setProccess] = useState(false);

	const loginUser = (e) => {
		e.preventDefault();
		setProccess(true);

		axios({
			method:"POST",
			data: {
				email, password
			},
			url: `${devApi}auth/login/`,
		}).then((res) => {
			console.log(res.data);
			setEmail("");
			setPassword("");
			setProccess(false);
			if (res.data.message === "password_error"){
				setAcctError(true);
			}
			if (res.data.message === true){
				setUser(res.data.user);
				setToken(res.data.token);
			}
		});
	}

	return (
		<>
				<div className="container-fluid custom__container pt-5">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-6"
							id="auth__imgcol">
							<img
								src={community}
								alt="authImg"
								className="img-fluid"
							/>
						</div>
						<div className="col-xl-6">
								<div className="card auth__card">
									<div id="error_div">
										{
											acctError?
											<div className="alert danger_alert">
												Invalid Username Or Password
												<i onClick={() => setAcctError(false)}>
													<TiIcons.TiTimes />
												</i>
											</div>
											:''
										}
									</div>
									<p id="auth__legend">Welcome Back Mate!</p>

									<form id="signin_form" onSubmit={loginUser}>
										<div className="row">
											<div className="col-sm-6 form-group auth_group">
												<input
													type="email"
													name="signin_email"
													placeholder="Email Address"
													className="form-control auth__input"
													id="signin_email"
													required={true}
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
											<div className="col-sm-6 form-group auth_group">
												<input
													type="password"
													name="signin_password"
													placeholder="Password"
													className="form-control auth__input"
													id="signin_password"
													required={true}
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</div>
										</div>
										<br />
										<button type="submit" className="auth__btn">
											{
												proccess ?
												<ImIcons.ImSpinner10 />
												:
												'Sign In'
											}
										</button>
										<span className="auth_redirectlink">
											<Link to="/register">
												Click Here To Sign Up</Link>, If You Don't 
												Have An Account
										</span>
									</form>
								</div>
						</div>
					</div>
				</div>
		</>
	)
}

export default Login;