import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const JobOpenings = ({devApi, devURL}) => {

	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			setJobs(res.data.jobs);
		});
	}, [devApi]);

	return (
		<div className="container-fluid custom__container pt-5">
			<div className="row justify-content-start">
				<div className="col-xl-5 col-lg-6 
					col-md-7 col-sm-8 col-12">
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
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
	)
}

const JobSingleCard = ({job, devURL}) => {

	const [showMoreInfo, setShowMoreInfo] = useState(false);

	const showMore = (e) => {
		e.preventDefault();
		setShowMoreInfo(!showMoreInfo);
	}

	return (
		<div className="card job_dashboard_singlecards">
			<img
				src={`${devURL}img/icon/${job.icon}`}
				alt="jobIcon"
			/>
			<span id="first">{job.title}</span>
			<div className="pl-2 pt-2 pb-2 ">
				<span><i>Salary: </i>{job.salary}</span>
				<span><i>Posted On:</i> <Moment format="DD MMM YYYY">
				{job.date_added}</Moment></span>
			</div>
			<Link to="/seemore" onClick={showMore}>
				see more
			</Link>
			{
				showMoreInfo?
				<div className="pt-2 pl-2 pr-1">
					<span className="pb-2"><i>Job Description: </i>
						<br />
						{job.description}
					</span>
					<div className="d-flex justify-content-end">
						<Link to={`/dashboard/jobs/${job.job_id}`}>
							Apply
						</Link>
					</div>
				</div>:''
			}
		</div>
	)
}

export default JobOpenings;