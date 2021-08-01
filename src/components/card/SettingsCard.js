//import {Link} from "react-router-dom";
import {useState} from "react";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import axios from "axios";

const SettingsCard = ({current_user, token, devApi, reloadUser}) => {

	const [saving, setSaving] = useState(false);

	const [firstname, setFirstname] = useState(current_user.firstname);
	const [lastname, setLastname] = useState(current_user.lastname);
	const [dob, setDob] = useState(new Date(current_user.dob).toLocaleDateString('en-CA'));
	const [gender, setGender] = useState(current_user.gender);
	const [number, setNumber] = useState(current_user.number);
	const [email, setEmail] = useState(current_user.email);
	const [state, setState] = useState(current_user.state);
	const [city, setCity] = useState(current_user.city);
	const [address, setAddress] = useState(current_user.address);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [emailError, setEmailError] = useState(false);

	const updateProfile = (e) => {
		e.preventDefault();
		setSaving(true);

		const information = {
			firstname, lastname, dob, gender, number, email, state, city, address
		}

		axios({
			method: "PUT",
			data: information,
			headers: {
				'Authorization': token
			},
			url: `${devApi}user/${current_user._id}/update/`,
		}).then((res) => {
			if (res.data.message === true){
				reloadUser();
				setEmailError(false);
				setSuccess(true);
			}else{
				if (res.data.message === 'email_error'){
					setEmailError(true);
				}else{
					setError(true);
				}
			}
			setSaving(false);
		});

	}

	return(
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card settings__card">
				<div className="header">
					<p>
						Person Profile
						<span>Please complete your profile to get started</span>
					</p>
				</div>

				<div className="body">
					<div
						className="divider"
						style={{
							marginTop: "0px",
							marginBottom: "10px",
							padding: "0.4px",
						}}
					></div>

					<div id="error_div">
						{
							error?
							<div className="alert danger_alert">
								An Error Occured, Please Try Again
								<i onClick={() => setError(false)}>
									<TiIcons.TiTimes />
								</i>
							</div>
							:
							<>
								{
									success?
									<div className="alert success_alert">
										Your Profile Was Succesfully Updated
										<i onClick={() => setSuccess(false)}>
											<TiIcons.TiTimes />
										</i>
									</div>:''
								}
							</>
						}
					</div>

					<form onSubmit={updateProfile}>
						<div className="card  credentials_card">
							<span className="first">Personal Details</span>
							<div className="row">
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="text"
											className="form-control auth__input"
											placeholder="Firstname"
											required={true}
											value={firstname}
											onChange={(e) => setFirstname(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="text"
											className="form-control auth__input"
											placeholder="Lastname"
											required={true}
											value={lastname}
											onChange={(e) => setLastname(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="date"
											className="form-control auth__input"
											required={true}
											value={dob}
											onChange={(e) => setDob(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="form-group">
										<select
											className="form-control auth__input"
											required={true}
											value={gender}
											onChange={(e) => setGender(e.target.value)}
										>
											<option selected disabled>Select Your Gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="card credentials_card">
							<span className="first">Contact Information</span>
							<div className="row">
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="number"
											className="form-control auth__input"
											placeholder="Phone Number"
											required={true}
											value={number}
											onChange={(e) => setNumber(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="text"
											placeholder="Email Address"
											required={true}
											className="form-control auth__input"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										{
											emailError?
											<p id="input_warning">This email is already taken</p>
											:''
										}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="text"
											className="form-control auth__input"
											placeholder="State"
											required={true}
											value={state}
											onChange={(e) => setState(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="form-group">
										<input
											type="text"
											className="form-control auth__input"
											placeholder="City"
											required={true}
											value={city}
											onChange={(e) => setCity(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<input
									type="address"
									className="form-control auth__input"
									placeholder="Residential Address"
									required={true}
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
						</div>

						<div className="save__button">
							<button type="submit" id="save__button">
								{
									saving?
									<ImIcons.ImSpinner4 />
									:'Save'
								} 
							</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	)
}

export default SettingsCard;