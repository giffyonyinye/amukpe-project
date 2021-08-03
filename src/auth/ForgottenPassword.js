import {useState} from "react";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import axios from "axios";
import {Redirect, Link} from "react-router-dom";

const ForgottenPassword = ({devApi, setUser, setToken, setChangedPassword}) => {

	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [processing, setProcessing] = useState(false);
	const [success, setSuccess] = useState(false);
	const [acctError, setAcctError] = useState(false);
	const [switchComponent, setSwitchComponent] = useState(false);

	const sendCode = (e) => {
		e.preventDefault();
		setProcessing(true);

		axios({
			method:"POST",
			data: {email},
			url: `${devApi}auth/send/code/`,
		}).then((res) => {
			setProcessing(false);
			console.log(res.data);
			const message = res.data.message;
			if (message === false){
				setAcctError(true);
			}
			if (message === true){
				setSwitchComponent(true);
			}
		});
	}

	const verifyCode = (e) => {
		e.preventDefault();
		setProcessing(true);

		axios({
			method:"POST",
			data: {code, email},
			url: `${devApi}auth/verify/code/`,
		}).then((res) => {
			setCode("");
			setProcessing(false);
			console.log(res.data);
			if (res.data.message === "code_error" || res.data.message === false){
				acctError(true);
			}else{
				setChangedPassword(true);
				setUser(res.data.user);
				setToken(res.data.token);
			}
		});

	}

	return (
		<>
			{
				success?
				<Redirect to={`/forgotten/password/${email}/code`}
				/>
				:
				<>
				<div className="container-fluid custom__container pt-5">
					<div className="row justify-content-center">
						{
							switchComponent?
							<>
							<div className="col-xl-5">
								<div className="card p-5">
									<div id="error_div">
										{
											acctError?
											<div className="alert danger_alert">
												Incorrect Verify Code
												<i onClick={() => setAcctError(false)}>
													<TiIcons.TiTimes />
												</i>
											</div>
											:
											<>
												{
													success?
													<div className="alert danger_alert">
														Your Password Is, We suggest 
														You change it
														<i onClick={() => 
															setSuccess(false)}>
															<TiIcons.TiTimes />
														</i>
													</div>:''
												}
											</>
										}
									</div>
									<form onSubmit={verifyCode}>
										<p
											style={{
												fontFamily: "var(--alegreya)",
												color: "var(--main-color)",
												fontSize: "18px"
											}}
										>Enter The Code We Sent To Your Mail
										</p>
										<div className="form-group">
											<input
												type="text"
												name="code"
												className="form-control auth__input p-4"
												placeholder="Enter Code"
												value={code}
												onChange={(e) => setCode(e.target.value)}
												required={true}
											/>
										</div>
										<Link
											to="/resend"
											onClick={sendCode}
											style={{
												fontFamily: "var(--arima)",
												fontSize: "14px",
												color: "var(--main-color)"
											}}
										>
											resend code</Link>
										<button
											className="auth__btn"
										>
											{
												processing?
												<ImIcons.ImSpinner10 />
												:
												'Verify'
											}
										</button>
									</form>
								</div>
							</div>
							</>
							:
							<>
							<div className="col-xl-6">
								<div className="card p-5">
									<div id="error_div">
										{
											acctError?
											<div className="alert danger_alert">
												This Email is not in Our Database
												<i onClick={() => setAcctError(false)}>
													<TiIcons.TiTimes />
												</i>
											</div>
											:''
										}
									</div>
									<form onSubmit={sendCode}>
										<p
											style={{
												fontFamily: "var(--alegreya)",
												color: "var(--main-color)",
												fontSize: "18px"
											}}
										>Enter Your Email Below, 
											We'll send a Code to your Email Address
										</p>
										<div className="form-group">
											<input
												type="email"
												name="email"
												className="form-control auth__input"
												placeholder="Enter Your Email Address"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required={true}
											/>
										</div>
										<button
											className="auth__btn"
										>
											{
												processing?
												<ImIcons.ImSpinner10 />
												:
												'Send'
											}
										</button>
									</form>
								</div>
							</div>
							</>
						}
					</div>
				</div>
				</>
			}
		</>
	)
}

export default ForgottenPassword;