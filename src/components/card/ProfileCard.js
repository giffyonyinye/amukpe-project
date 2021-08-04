import "../../assets/css/profile.css";
import AvatarImg from "../../assets/img/avatar.png";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import {useState, useEffect} from "react";
import axios from "axios";
import * as TiIcons from "react-icons/ti";
import Modal from "react-modal";

const ProfileCard = ({current_user, devURL, devApi, token}) => {

	const [showModal, setShowModal] = useState(false);
	const [appliedJobs, setAppliedJobs] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}user/${current_user.email}/jobs/applied/`,
		}).then((res) => {
			if (res.data.message === undefined){
				setAppliedJobs(res.data.applied_jobs);
			}
		});
	}, [devApi, token, current_user.email])

	const toggleModal = (e) => {
		e.preventDefault();
		setShowModal(!showModal);
	}

	return(
		<>
			{
				current_user !== null?
				<div className="col-xl-5 pl-2 pr-1">

					{
						showModal?
						<AddJobModal
							toggleModal={toggleModal}
							current_user={current_user}
						/>
						:''
					}

					<div className="card profile__card">
						<div className="header">
							{
								current_user.profile_picture === "default.webp"?
								<img
									src={AvatarImg}
									alt="profilePicture"
									className="avatar_img"
								/>
								:
								<img
									src={`${devURL}img/profile/
									${current_user.profile_picture}`}
									alt="profilePicture"
									className="avatar_img"
								/>
							}
							<p>
								{current_user.firstname} {current_user.lastname} - 
									@{current_user.email}
								<span>Joined: <Moment format="YYYY/MM/DD">
										{current_user.date_joined}</Moment>
								</span>
								{
									current_user.gender !== undefined?
									<span>
										Gender: ${current_user.gender}
									</span>:''
								}
								{
									current_user.number !== undefined?
									<span>
										Contact: ${current_user.number}
									</span>:''
								}
								{
									current_user.qualification !== undefined?
									<span>
										Qualification: ${current_user.qualification}
									</span>:''
								}
								{
									current_user.cv !== undefined?
									<span>Resume: 
										<Link
											to={`/preview/file/${current_user.cv}/`}
											onClick={toggleModal}
										> 
												{current_user.cv}
										</Link>
									</span>:''
								}
							</p>
						</div>

						<div className="body">
							<div
								className="divider"
								style={{
									marginTop: "0px",
									marginBottom: "15px",
									padding: "0.4px",
								}}
							></div>

							{
								current_user.passport !== undefined?
								<img
									src={`${devURL}img/passport/${current_user.passport}`}
									alt="passportImg"

									className="passport_img"
								/>:''
							}

								{
									current_user.dob !== undefined?
									<span>
										Date Of Birth: <Moment format="DD/MM/YYYY">
										{current_user.dob}</Moment>
									</span>:''
							}
							{
								current_user.address !== undefined?
								<span>
									Current Address: {current_user.address}
								</span>:''
							}
							{
								current_user.state !== undefined?
								<span>
									State: {current_user.state}
								</span>:''
							}
							{
								current_user.city !== undefined?
								<span>
									City: {current_user.city}
								</span>:''
							}

							<div>
								<span>Applied Jobs: {appliedJobs.length}</span>
								<br />
								<div>
									{
										appliedJobs.length > 0?
										appliedJobs.map((value, index) => {
											return(
												<JobSingleCard
													job={value}
													key={index}
													devURL={devURL}
												/>
											)
										}):''
									}
								</div>
							</div>
							<br />
							<Link
								to="/dashboard/settings"
								id="add_job_button"
							>
								Edit Your Profile
							</Link>
						</div>
					</div>
				</div>:''
			}
		</>
	)
}

const AddJobModal = ({toggleModal, current_user}) => {

	Modal.setAppElement('#root');
	return(
		<Modal
			isOpen={true}
			className="resumeModal"
			overlayClassName="add_job_modaloverlay"
			closeTimeoutMS={1000000}
		>
			<div className="header">
				<p>
					{current_user.firstname} {current_user.lastname} Resume
					<TiIcons.TiTimes
						onClick={toggleModal}
					/>
				</p>
			</div>
			<div className="body">
				<object
					data="http://africau.edu/images/default/sample.pdf"
					type="application/pdf"
					style={{
						width: "100%",
						height: "100%"
					}}
				>
					<p>
						Alternative text - include a link 
						<a href="http://africau.edu/images/default/sample.pdf">
						to the PDF!</a>
					</p>
				</object>
			</div>
		</Modal>
	)
}

const JobSingleCard = ({job, devURL}) => {
	return (
		<div className="card job_dashboard_singlecards">
			<img
				src={`${devURL}img/icon/${job.icon}`}
				alt="jobIcon"
			/>
			<span id="first"
				style={{
					marginBottom: "0px",
					marginTop: "0px"
				}}
			>{job.title}</span>
			<div className="pl-2 pt-2 pb-1">
				<span
					style={{
						marginTop: "0px",
						marginBottom: "1px"
					}}
				><i>Salary: </i>{job.salary}</span>
				<span
					style={{
						marginBottom: "0px",
						marginTop: "1px"
					}}
				><i>Posted On:</i> <Moment format="DD MMM YYYY">
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

export default ProfileCard;