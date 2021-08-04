import {useState, useEffect} from "react";
import Modal from 'react-modal';
import axios from "axios";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import LoadingDiv from "../../../../components/misc/LoadingDiv";

const AdminDashboard = ({current_user, token, devApi, devURL,
	reloadUser, reloadSidebarJobs}) => {

	const [loading, setLoading] = useState(true);
	const [jobModal, setJobModal] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [jobs, setJobs] = useState([]);

	const [addSuccess, setAddSuccess] = useState({
		job_id: "",
		state: false
	});

	const toggleModal = () => {
		setJobModal(!jobModal);
		setDisabled(!disabled);
	}

	useEffect(() => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			setJobs(res.data.jobs);
			setLoading(false);
		});
	}, [token, devApi]);

	const reloadJobs = () => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			reloadSidebarJobs();
			setJobs(res.data.jobs);
		});
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
					reloadJobs={reloadJobs}
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

						<>
							{
								loading?
								<LoadingDiv />
								:
								<>
								{
									jobs.length !== 0?
									jobs.map((value, index) => {
										return (
											<JobSingleCard
												job={value}
												key={index}
												devURL={devURL}
											/>
										)
									}):''
								}
								</>
							}
						</>

						<br />

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

const JobSingleCard = ({job, devURL}) => {
	return (
		<div className="card job_dashboard_singlecards">
			<img
				src={`${devURL}img/icon/${job.icon}`}
				alt="jobIcon"
			/>
			<span id="first">{job.title}</span>
			<div className="pl-2 pt-2 pb-1">
				<span><i>Salary: </i>{job.salary}</span>
				<span><i>Posted On:</i> <Moment format="DD MMM YYYY">
				{job.date_added}</Moment></span>
			</div>
			<div className="d-flex justify-content-end">
				<Link to={`/dashboard/jobs/${job.job_id}`}>
					Visit
				</Link>
			</div>
		</div>
	)
}

const AddJobModal = ({setAddSuccess, toggleModal, current_user, token, 
	devApi, devURL, reloadUser, reloadJobs}) => {

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
			setUploadingJob(false);
			if (res.data.message === true){
				setAddSuccess({
					job_id:res.data.job.job_id,
					state: true
				});
				reloadJobs();
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