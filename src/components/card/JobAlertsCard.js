import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Moment from "react-moment";

const JobAlertsCard = ({devApi, token}) => {

	const [jobListing, setJobListing] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			console.log(res.data);
			setJobListing(res.data.jobs);
		});
	}, [token, devApi]);

	return(
		<div className="col-xl-3 pl-2 pr-0">
			<div className="card jobalert_card">
				<div className="header">
					<p>Job Alerts</p>
				</div>
				<div className="body">
					{
						jobListing.length !== 0?
						jobListing.slice(0,4).map((value, index) => {
							return (
								<JobSingles
									key={index}
									job={value}
								/>
							)
						}):''
					}
					<br />
					<Link to="/dashboard/jobs" id="view_more">
						View More
					</Link>
				</div>
			</div>
		</div>
	)
}

const JobSingles = ({job}) => {
	return(
		<Link to={`/dashboard/jobs/${job.job_id}`}>
			{job.title}
			<i>
				<Moment fromNow>{job.date_added}</Moment>
			</i>
		</Link>
	)
}

export default JobAlertsCard;