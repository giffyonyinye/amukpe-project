import "../../assets/css/profile.css";
import AvatarImg from "../../assets/img/avatar.png";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import {useState, useEffect} from "react";
import axios from "axios";

const ProfileCard = ({current_user, devURL, devApi, token}) => {

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

	return(
		<>
			{
				current_user !== null?
				<div className="col-xl-5 pl-2 pr-1">

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
								<span>
									{
										current_user.gender !== undefined?
										`Gender: ${current_user.gender}`:''
									}
								</span>
								<span>
									{
										current_user.number !== undefined?
										`Contact: ${current_user.number}`:''
									}
								</span>
								<span>
									{
										current_user.qualification !== undefined?
										`Qualification: ${current_user.qualification}`:''
									}
								</span>
								<span>
									{
										current_user.cv !== undefined?
										<>Resume: 
										<Link
											to={`/preview/file/${current_user.cv}/`}> 
												{current_user.cv}
										</Link></>:''
									}
								</span>
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

							<span className="active">
								{
									current_user.dob !== undefined?
									<>Date Of Birth: <Moment format="DD/MM/YYYY">
										{current_user.dob}</Moment></>:''
								}
							</span>
							<span>
								{
									current_user.address !== undefined?
									<>Current Address: {current_user.address}</>:''
								}
							</span>
							<span>
								{
									current_user.state !== undefined?
									<>State: {current_user.state}</>:''
								}
							</span>
							<span>
								{
									current_user.city !== undefined?
									<>City: {current_user.city}</>:''
								}
							</span>
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