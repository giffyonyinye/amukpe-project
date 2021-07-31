import {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";

const SingleJobCard = ({current_user, token, devApi, devURL, reloadUser}) => {

	const [job, setJob] = useState(null);
	const [editJobModal, setEditJobModal] = useState(false);

	const toggleModal = () => {
		setEditJobModal(!editJobModal);
	}

	useEffect(() => {
		const id = window.location.pathname.split('/')[3];
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/single/${id}/`,
		}).then((res) => {
			setJob(res.data.job);
		});
	}, [token, devApi]);

	return (
		<>
			<EditModal
				current_user={current_user}
				token={token}
				devApi={devApi}
				devURL={devURL}
				reloadUser={reloadUser}
				job={job}
				toggleModal={toggleModal}
			/>
			{
				current_user.password !== "admin_login_id"?
				<p>Job Card</p>
				:
				<AdminJobsCard
					current_user={current_user}
					token={token}
					devApi={devApi}
					devURL={devURL}
					reloadUser={reloadUser}
					job={job}
					toggleModal={toggleModal}
				/>
			}
		</>
	)
}

const AdminJobsCard = ({toggleModal, current_user, token, devApi,
	devURL, reloadUser, job}) => {
	return (
		<div className="col-xl-5 pl-2 pr-1">
			{
				job !== null?
				<div className="card dashboard_card singlejob__card">
					<div className="header">
						<p>{job.title} - Details</p>
					</div>
					<div className="body">
						<span>Job Title: {job.title}</span>
						<span>Job Location: {job.location}</span>
						<span>Job Salary: {job.salary}</span>
						<span>Added On {job.date_added}</span>

						<i id="description_header">Job Description: </i>
						<span>{job.description}</span>
						<br />
						<button
							id="add_job_button"
							onClick={toggleModal}
						>
							Edit This Job
						</button>
					</div>
				</div>
				:''
			}
		</div>
	)
}

const EditModal = ({toggleModal}) => {

	//const [uploadingJob, setUploadingJob] = useState(false);
	const [jobTitle, setJobTitle] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobSalary, setJobSalary] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobIcon, setJobIcon] = useState({});

	const changeJobIcon = (e) => {
		setJobIcon(e.target.files[0]);
		document.getElementById("job_iconlabel").innerText =
			`${e.target.files[0].name.slice(0,20)}...`;
	}

	return (
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
				<form>
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

export default SingleJobCard;