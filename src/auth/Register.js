import {useState} from "react";
import * as TiIcons from "react-icons/ti";
import * as ImIcons from "react-icons/im";
import {Link, Redirect} from "react-router-dom";
import job from "../assets/img/job.svg";
import "../assets/css/auth.css";
import axios from "axios";

const Register = ({devApi}) => {

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");

	const [acctError, setAcctError] = useState(false);
	const [proccess, setProccess] = useState(false);
	const [done, setDone] = useState(false);

	const handleRegister = (e) => {
		e.preventDefault();
		setProccess(true);

		console.log("Sending...");

		axios({
			method:"POST",
			data: {
				email, firstname, password, lastname
			},
			url: `${devApi}auth/register/`,
		}).then((res) => {
			setFirstname("");
			setLastname("");
			setEmail("");
			setPassword("");
			setProccess(false);
			if (res.data.message === true){
				setDone(true);
			}else{
				setAcctError(true);
			}
		});
	}

	return (
		<>
			{
				done?
				<Redirect to="/login" />
				:
				<div className="container-fluid custom__container pt-5">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-6"
							id="auth__imgcol">
							<img
								src={job}
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

									<form id="signin_form" onSubmit={handleRegister}>
										<div className="row">
											<div className="col-sm-6 form-group auth_group">
												<input
													type="email"
													name="auth_email"
													placeholder="Email Address"
													className="form-control auth__input"
													id="signup_email"
													required={true}
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
											<div className="col-sm-6 form-group auth_group">
												<input
													type="text"
													name="auth_firstname"
													placeholder="Firstname"
													className="form-control auth__input"
													id="signup_firstname"
													required={true}
													value={firstname}
													onChange={(e) => setFirstname(e.target.value)}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-6 form-group auth_group">
												<input
													type="text"
													name="auth_lastname"
													placeholder="Lastname"
													className="form-control auth__input"
													id="signup_lastname"
													required={true}
													value={lastname}
													onChange={(e) => setLastname(e.target.value)}
												/>
											</div>
											<div className="col-sm-6 form-group auth_group">
												<input
													type="password"
													name="auth_password"
													placeholder="Password"
													className="form-control auth__input"
													id="signup_password"
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
												'Sign Up'
											}
										</button>
										<span className="auth_redirectlink">
											<Link to="/login">
												Click Here To Sign In</Link>, If You Already 
												Have An Account
										</span>
									</form>
								</div>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default Register;