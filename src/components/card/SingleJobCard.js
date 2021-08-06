import {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import Moment from 'react-moment';
import {Link, Redirect} from "react-router-dom";
import LoadingDiv from "../misc/LoadingDiv";

const SingleJobCard = ({current_user, token, devApi, devURL, reloadUser, reloadSidebarJob}) => {

	const [loading, setLoading] = useState(true);
	const [job, setJob] = useState(null);
	const [editJobModal, setEditJobModal] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [notFound, setNotFound] = useState(false);

	const toggleModal = () => {
		console.log("Togggling....")
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
			if (res.data.message === true){
				setJob(res.data.job);
			}else{
				setNotFound(true);
			}
			setLoading(false);
		});
	}, [token, devApi]);

	const reloadJob = () => {
		const id = window.location.pathname.split('/')[3];
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/single/${id}/`,
		}).then((res) => {
			if (res.data.message === true){
				setJob(res.data.job);
			}else{
				setNotFound(true);
			}
		});	
	}

	return (
		<>
			{
				deleted?
				<Redirect to="/dashboard/jobs" />
				:
				<>
					{
						notFound?
						<div className="col-xl-5 pl-2 pr-1">
							<div className="card dashboard_card p-4">
								<h1>Job Not Found</h1>
							</div>
						</div>
						:
						<>
							{
								editJobModal?
								<EditModal
									current_user={current_user}
									token={token}
									devApi={devApi}
									devURL={devURL}
									reloadUser={reloadUser}
									job={job}
									setJob={setJob}
									toggleModal={toggleModal}
								/>:''
							}
							<div className="col-xl-5 pl-2 pr-1">
								{
									loading?
									<LoadingDiv />
									:
									<>
									{
										current_user.password !== "admin_login_id"?
										<UserJobsCard
											current_user={current_user}
											token={token}
											devApi={devApi}
											devURL={devURL}
											reloadUser={reloadUser}
											job={job}
											toggleModal={toggleModal}
											reloadJob={reloadJob}
										/>
										:
										<AdminJobsCard
											current_user={current_user}
											token={token}
											devApi={devApi}
											devURL={devURL}
											reloadUser={reloadUser}
											job={job}
											toggleModal={toggleModal}
											setDeleted={setDeleted}
											reloadSidebarJob={reloadSidebarJob}
										/>
									}
									</>
								}
							</div>
						</>
					}
				</>
			}
		</>
	)
}

const UserJobsCard = ({toggleModal, current_user, token, devApi,
	devURL, reloadUser, job, reloadJob}) => {

	const [applying, setApplying] = useState(false);
	const [applied, setApplied] = useState(null);
	const [applyError, setApplyError] = useState(false);
	const [applySuccess, setApplySuccess] = useState(false);

	useEffect(() => {
		if (job !== null){
			const check = job.applications.find(item => item['email'] === current_user.email);

			if (check === undefined){
				setApplied(false);
			}else{
				setApplied(true);
			}
		}
	}, [current_user, job])

	const applyForJob = () => {
		const id = window.location.pathname.split('/')[3];

		const infos = ["passport", "dob", "gender", "number", "state", "city", 
			"address", "qualification", "cv"]
		const current_infos = []
		
		Object.keys(current_user).forEach(key => {
			current_infos.push(key);
		})

		const found = infos.some(r=> current_infos.includes(r))

		if (found !== false){
			setApplying(true);
			axios({
				method: "PUT",
				headers: {
					'Authorization': token
				},
				url: `${devApi}jobs/apply/${id}/${current_user.email}/`,
			}).then((res) => {
				console.log(res.data);
				setApplying(false);
				reloadJob();
				setApplySuccess(true);
			});
		}else{
			setApplyError(true);
		}

	}

	return (
		<>
			{
				job !== null?
				<div className="card dashboard_card singlejob__card">
					<div className="header">
						<img
							src={`${devURL}img/icon/${job.icon}`}
							alt="jobIcon"
						/>
						<p>{job.title} - Details</p>
					</div>
					<div className="body">
						<div id="error_div">
							{
								applyError?
								<div className="alert danger_alert">
									Please Complete Your Profile And 
										Resume Settings to Apply for Jobs
									<i onClick={() => setApplyError(false)}>
										<TiIcons.TiTimes />
									</i>
								</div>
								:''
							}
							{
								applySuccess?
								<div className="alert success_alert">
									Successfully Applied For This Job
									<i onClick={() => setApplySuccess(false)}>
										<TiIcons.TiTimes />
									</i>
								</div>
								:''
							}
						</div>
						<span>Job Title: {job.title}</span>
						<span>Job Location: {job.location}</span>
						<span>Job Salary: {job.salary}</span>
						<span>Added On <strong><Moment format="DD MMM YYYY">
							{job.date_added}
						</Moment></strong></span>

						<i id="description_header">Job Description: </i>
						<span>{job.description}</span>
						<br />

						{
							applied?
							<button
								id="add_job_button"
								disabled={true}
							>Already Applied For This Job</button>
							:
							<button
								id="add_job_button"
								onClick={applyForJob}
							>
								{
									applying?
									<ImIcons.ImSpinner8 />
									:'Apply For This Job'
								}
							</button>
						}
					</div>
				</div>:''
			}
		</>
	)
}

const AdminJobsCard = ({toggleModal, current_user, token, devApi,
	devURL, reloadUser, job, setDeleted, reloadSidebarJob}) => {

	const [applicants, setApplicants] = useState([]);

	const showApplicants = (e) => {
		e.preventDefault();
		setApplicants(job.applications);
	}

	const deleteJob = () => {
		axios({
			method: "DELETE",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/single/${job.job_id}/delete/`,
		}).then((res) => {
			if (res.data.message !== false){
				reloadSidebarJob();
				setDeleted(true);
			}
		});
	}

	return (
		<>
			{
				job !== null?
				<div className="card dashboard_card singlejob__card">
					<div className="header">
						<img
							src={`${devURL}img/icon/${job.icon}`}
							alt="jobIcon"
						/>
						<p>{job.title} - Details</p>
					</div>
					<div className="body">
						<span>Job Title: {job.title}</span>
						<span>Job Location: {job.location}</span>
						<span>Job Salary: {job.salary}</span>
						<span>Added On <strong><Moment format="DD MMM YYYY">
							{job.date_added}
						</Moment></strong></span>

						<i id="description_header">Job Description: </i>
						<span>{job.description}</span>
						<Link
							to="/job/applicants"
							id="view_application"
							onClick={showApplicants}
						>
							View Applicants
						</Link>
						<br />
						<div>
							{
								applicants.length !== 0?
								applicants.map((value, index) => {
									return(
										<ApplicantsCard
											user={value}
											key={index}
											devURL={devURL}
										/>
									)
								}):''
							}
						</div>
						<br />
						<button
							id="add_job_button"
							onClick={toggleModal}
						>
							Edit This Job
						</button>
						<button
							id="add_job_button"
							className="delete"
							style={{
								marginRight: "10px",
								border: "1px solid red"
							}}
							onClick={deleteJob}
						>
							Delete Job
						</button>
					</div>
				</div>
				:''
			}
		</>
	)
}

const EditModal = ({toggleModal, job, token, devApi, setJob}) => {

	const [uploadingJob, setUploadingJob] = useState(false);
	const [jobTitle, setJobTitle] = useState(job.title);
	const [jobLocation, setJobLocation] = useState(job.location);
	const [jobSalary, setJobSalary] = useState(job.salary);
	const [jobDescription, setJobDescription] = useState(job.description);
	const [jobIcon, setJobIcon] = useState({});

	const submitEditedJob = (e) => {
		e.preventDefault();
		const id = window.location.pathname.split('/')[3];
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
			url: `${devApi}jobs/get/single/${id}/edit/`,
		}).then((res) => {
			console.log(res.data);
			setUploadingJob(false);
			if (res.data.message === true){
				console.log("Done");
				setJob(res.data.job);
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

	return (
		<Modal
			isOpen={true}
			className="add_job_modal"
			overlayClassName="add_job_modaloverlay"
			closeTimeoutMS={1000000}
		>
			<div className="header">
				<p>
					Edit This Job
					<TiIcons.TiTimes
						onClick={toggleModal}
					/>
				</p>
			</div>
			<div className="body">
				<form onSubmit={submitEditedJob}>
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
							:'Finish'
						}
					</button>
					<br />
					<br />

				</form>
			</div>
		</Modal>
	)
}

const ApplicantsCard = ({user, devURL}) => {
	return (
		<div className="card job_dashboard_singlecards">
			<img
				src={`${devURL}img/profile/${user.profile_picture}`}
				alt="jobIcon"
			/>
			<div className="pl-1 pt-0 pb-0">
				<span><i>Name: </i>{user.firstname} {user.lastname}</span>
				<span><i>Date Joined:</i> <Moment format="DD MMM YYYY">
				{user.date_joined}</Moment></span>
			</div>
			<div className="d-flex justify-content-end">
				<Link to={`/dashboard/users/${user.email}`}>
					Visit Profile
				</Link>
			</div>
		</div>
	)
}

export default SingleJobCard;