import {useState, useEffect} from "react";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import axios from "axios";
import {Redirect} from "react-router-dom";

const EnterCode = ({devApi}) => {

	const [code, setCode] = useState("");
	const [processing, setProcessing] = useState(false);
	const [success, setSuccess] = useState(false);
	const [acctError, setAcctError] = useState(false);
	const [activateError, setActivateError] = useState(false);

	useEffect(() => {
		const email = window.location.pathname.split("/")[3];
		axios({
			method:"GET",
			data: {email},
			url: `${devApi}user/get/${email}/`,
		}).then((res) => {
			console.log(res.data);
			if (res.data.message === false){
				setActivateError(true)
			}else{
				if (res.data.user.code === undefined){
					setActivateError(true)
				}
			}
		});
	}, [devApi]);

	const verifyCode = (e) => {
		e.preventDefault();
		setProcessing(true);
		console.log(code);

		const email = window.location.pathname.split("/")[3];
		console.log(email);

		axios({
			method:"POST",
			data: {code, email},
			url: `${devApi}auth/verify/code/`,
		}).then((res) => {
			setCode("");
			console.log(res.data);
		});

	}

	return (
		<>
			{
				activateError?
				<Redirect to="/login" />
				:
				<div className="container-fluid custom__container pt-5">
					<div className="row justify-content-center">
						<div className="col-xl-5">
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
										:
										<>
											{
												success?
												<div className="alert danger_alert">
													Your Password Is, We suggest You change it
													<i onClick={() => setSuccess(false)}>
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
					</div>
				</div>
			}
		</>
	)
}

export default EnterCode;