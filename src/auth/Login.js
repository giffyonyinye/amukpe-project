import {useState} from "react";
import * as TiIcons from "react-icons/ti";
import * as ImIcons from "react-icons/im";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import axios from "axios";
import community from "../assets/img/communitySvg.svg";
import "../assets/css/auth.css";
import Footer from "../pages/Footer";

const Login = ({devApi, setUser, setToken}) => {

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [passwordType, setPasswordType] = useState("password");

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
			setEmail("");
			setPassword("");
			setProccess(false);
			const message = res.data.message;
			if (message === "password_error" || message === false){
				setAcctError(true);
			}
			if (message === true){
				setUser(res.data.user);
				setToken(res.data.token);
			}
		});
	}

	const toggleShowPassword = (e) => {
		e.preventDefault();
		if (passwordType === "password"){
			setPasswordType("text");
		}
		if (passwordType === "text"){
			setPasswordType("password");
		}
	}

	return (
		<>
				<div className=" pt-5">
					<div className="row justify-content-center" style={{paddingTop:"6rem"}}>
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
													onChange={(e) => 
														setEmail(e.target.value)}
												/>
											</div>
											<div className="col-sm-6 form-group auth_group">
												<div
													style={{
														display: "flex"
													}}
												>
													<input
														type={passwordType}
														name="signin_password"
														placeholder="Password"
														className="form-control auth__input"
														id="signin_password"
														required={true}
														value={password}
														onChange={(e) => 
															setPassword(e.target.value)}
													/>
													<button
														type="button"
														onClick={toggleShowPassword}
													>
														<AiIcons.AiFillEye />
													</button>
												</div>
												<Link
													to="/forgotten/password"
													style={{
														fontSize: "11px",
														paddingLeft: "5px",
														paddingRight: "5px",
														fontFamily: "var(--arima)",
														color: "var(--main-color)"
													}}
												>
													Forgotten Password?
												</Link>
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
					<br/>
					<br/>
					<br/>

					<Footer/>
				</div>
		</>
	)
}

export default Login;