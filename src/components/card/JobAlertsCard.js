import {Link} from "react-router-dom";

const JobListing = [
	{
		title: "Youth Empowerment Program",
		date_added: "29th July 2021",
		link: "youth-empowerment-program",
	},
	{
		title: "Youth Empowerment Program",
		date_added: "29th July 2021",
		link: "youth-empowerment-program",
	},
	{
		title: "Youth Empowerment Program",
		date_added: "29th July 2021",
		link: "youth-empowerment-program",
	},
	{
		title: "Youth Empowerment Program",
		date_added: "29th July 2021",
		link: "youth-empowerment-program",
	},
]

const JobAlertsCard = () => {
	return(
		<div className="col-xl-3 pl-2 pr-0">
			<div className="card jobalert_card">
				<div className="header">
					<p>Job Alerts</p>
				</div>
				<div className="body">
					{
						JobListing.map((value, index) => {
							return (
								<JobSingles
									key={index}
									job={value}
								/>
							)
						})
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
		<Link to={`/job/${job.link}`}>
			{job.title}
			<i>
				{job.date_added}
			</i>
		</Link>
	)
}

export default JobAlertsCard;