import {useState} from "react";
import Modal from 'react-modal';
import axios from "axios";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import {Link} from "react-router-dom";

const AdminDashboard = ({current_user, token, devApi, devURL, reloadUser}) => {

	const [jobModal, setJobModal] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const [addSuccess, setAddSuccess] = useState({
		job_id: "",
		state: false
	});

	const toggleModal = () => {
		setJobModal(!jobModal);
		setDisabled(!disabled);
	}

	return (
		<>
			{
				jobModal?
				<AddJobModal
					toggleModal={toggleModal}
					current_user={current_user}
					token={token}
					devApi={devApi}
					devURL={devURL}
					reloadUser={reloadUser}
					setAddSuccess={setAddSuccess}
				/>
				:''
			}
			<div className="col-xl-5 pl-2 pr-1">
				<div className="card dashboard_card">
					<div className="header">
						<p>Admin Dashboard</p>
					</div>
					<div className="body">
						<div id="error_div">
							{
								addSuccess.state === true?
								<div className="alert success_alert">
									Job Successfully Added ⸻ <Link
										to={`/dashboard/jobs/${addSuccess.job_id}`}>
										view job
									</Link>
									<i onClick={() => setAddSuccess({})}>
										<TiIcons.TiTimes />
									</i>
								</div>
								:''
							}
						</div>

						<button
							id="add_job_button"
							onClick={toggleModal}
							disabled={disabled}
						>Add Job
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

const AddJobModal = ({setAddSuccess, toggleModal, current_user, token, 
	devApi, devURL, reloadUser}) => {

	const [uploadingJob, setUploadingJob] = useState(false);
	const [jobTitle, setJobTitle] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobSalary, setJobSalary] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobIcon, setJobIcon] = useState({});

	const uploadJob = (e) => {
		e.preventDefault();

		setUploadingJob(true);

		const form_data = new FormData();
		form_data.append("job_title", jobTitle);
		form_data.append("job_location", jobLocation);
		form_data.append("job_salary", jobSalary);
		form_data.append("job_description", jobDescription);
		form_data.append("job_icon", jobIcon);

		axios({
			method: "POST",
			data: form_data,
			headers: {
				'Authorization': token
			},
			url: `${devApi}admin/job/add/`,
		}).then((res) => {
			console.log(res.data);
			setUploadingJob(false);
			if (res.data.message === true){
				console.log("Done");
				setAddSuccess({
					job_id:res.data.job.job_id,
					state: true
				})
				toggleModal();
			}
		});

	}

	const changeJobIcon = (e) => {
		setJobIcon(e.target.files[0]);
		document.getElementById("job_iconlabel").innerText =
			`${e.target.files[0].name.slice(0,20)}...`;
	}

	Modal.setAppElement('#root');
	return(
		<Modal
			isOpen={true}
			className="add_job_modal"
			overlayClassName="add_job_modaloverlay"
			closeTimeoutMS={1000000}
		>
			<div className="header">
				<p>
					Add A New Job
					<TiIcons.TiTimes
						onClick={toggleModal}
					/>
				</p>
			</div>
			<div className="body">
				<form onSubmit={uploadJob}>
					<div className="row">
						<div className="col-sm-6">
							<div className="form-group">
								<input
									type="text"
									placeholder="Job Title"
									className="form-control auth__input"
									id="job_title"
									value={jobTitle}
									onChange={(e) => setJobTitle(e.target.value)}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<input
									type="text"
									placeholder="Location"
									className="form-control auth__input"
									id="job_location"
									value={jobLocation}
									onChange={(e) => setJobLocation(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<div className="form-group">
								<input
									type="text"
									placeholder="Salary"
									className="form-control auth__input"
									id="job_salary"
									value={jobSalary}
									onChange={(e) => setJobSalary(e.target.value)}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label
									htmlFor="job_icon"
									id="job_iconlabel"
								>
									Job Icon - Choose File
								</label>
								<input
									type="file"
									className="jobicon_fileupload"
									hidden={true}
									id="job_icon"
									onChange={changeJobIcon}
								/>
							</div>
						</div>
					</div>

					<textarea
						cols="10"
						rows="5"
						placeholder="Detailed Job Description"
						className="form-control auth__input"
						value={jobDescription}
						onChange={(e) => setJobDescription(e.target.value)}
					/>
					<br />
					<button
						type="submit"
						id="add_job_button"
					>
						{
							uploadingJob?
							<ImIcons.ImSpinner8 />
							:'Upload'
						}
					</button>
					<br />
					<br />

				</form>
			</div>
		</Modal>
	)
}

export default AdminDashboard;