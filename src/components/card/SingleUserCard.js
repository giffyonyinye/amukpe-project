import {useState, useEffect} from "react";
import axios from "axios";
import AvatarImg from "../../assets/img/avatar.png";
import Moment from "react-moment";
import {Link} from "react-router-dom";

const SingleUserCard = ({token, devApi, devURL, current_user}) => {

	const [user, setUser] = useState(null);
	const [appliedJobs, setAppliedJobs] = useState([]);

	useEffect(() => {
		const email = window.location.pathname.split('/')[3];
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}user/${email}`,
		}).then((res) => {
			setUser(res.data.user);
			axios({
				method: "GET",
				headers: {
					'Authorization': token
				},
				url: `${devApi}user/${res.data.user.email}/jobs/applied/`,
			}).then((res) => {
				setAppliedJobs(res.data.applied_jobs);
			});
		});

	}, [token, devApi])

	return (
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card profile__card">
				{
					user !== null?
					<>
						<div className="header">
							{
								user.profile_picture === "default.webp"?
								<img
									src={AvatarImg}
									alt="profilePicture"
									className="avatar_img"
								/>
								:
								<img
									src={`${devURL}img/profile/
									${user.profile_picture}`}
									alt="profilePicture"
									className="avatar_img"
								/>
							}
							<p>
								{user.firstname} {user.lastname} - 
									@{user.email}
								<span>Joined: <Moment format="YYYY/MM/DD">
										{user.date_joined}</Moment>
								</span>
								<span>
									{
										user.gender !== undefined?
										`Gender: ${user.gender}`:''
									}
								</span>
								<span>
									{
										user.number !== undefined?
										`Contact: ${user.number}`:''
									}
								</span>
								<span>
									{
										user.qualification !== undefined?
										`Qualification: ${user.qualification}`:''
									}
								</span>
								<span>
									{
										user.cv !== undefined?
										<>Resume: 
										<Link
											to={`/preview/file/${user.cv}/`}> 
												{user.cv}
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
								user.passport !== undefined?
								<img
									src={`${devURL}img/passport/${user.passport}`}
									alt="passportImg"

									className="passport_img"
								/>:''
							}

							<span className="active">
								{
									user.dob !== undefined?
									<>Date Of Birth: <Moment format="DD/MM/YYYY">
										{user.dob}</Moment></>:''
								}
							</span>
							<span>
								{
									user.address !== undefined?
									<>Current Address: {user.address}</>:''
								}
							</span>
							<span>
								{
									user.state !== undefined?
									<>State: {user.state}</>:''
								}
							</span>
							<span>
								{
									user.city !== undefined?
									<>City: {user.city}</>:''
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
							<br />
						</div>
					</>
					:''
				}
			</div>
		</div>
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

export default SingleUserCard;