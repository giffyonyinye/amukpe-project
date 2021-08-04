import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import LoadingDiv from "../misc/LoadingDiv";

const DashboardJobCard = ({current_user, token, devApi, devURL, reloadUser}) => {

	const [loading, setLoading] = useState(true);
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			setJobs(res.data.jobs);
			setLoading(false);
		});
	}, [token, devApi]);

	return(
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card dashboard_card">
				<div className="header">
					{
						current_user.email === "admin@gmail.com"?
						<p>Admin Added Jobs</p>
						:
						<p>Jobs: For You</p>
					}
				</div>
				<div className="body">
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
				</div>
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

export default DashboardJobCard;