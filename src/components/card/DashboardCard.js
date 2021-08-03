import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const DashboardCard = ({current_user, devApi, token, changedPassword, 
	setChangedPassword}) => {

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
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card dashboard_card">
				<div className="header">
					<p>Dashboard</p>
				</div>
				<div className="body">
					<div id="error_div">
						{
							changedPassword?
							<div className="alert danger_alert">
								Your password has been set to <strong
									style={{fontWeight:"bold"}}
								>123456 </strong>
								Please change it <Link to="/dashboard/settings">
									From Here</Link>
								<i onClick={() => setChangedPassword(false)}>
									<TiIcons.TiTimes />
								</i>
							</div>:''
						}
					</div>
					<div className="row">
						<div className="col-xl-6 progress_cardcol">
							<div className="card progress_cards">
								<span>Jobs Applied To: {appliedJobs.length}</span>
								<BiIcons.BiBriefcase
									className="first"
								/>

								<Link to="/job/applied">
									See All <HiIcons.HiOutlineArrowNarrowRight />
								</Link>
							</div>
						</div>
						<div className="col-xl-6 progress_cardcol">
							<div className="card progress_cards">
								<span>Resume (CV)</span>
								<HiIcons.HiOutlineDocumentDuplicate
									className="first"
								/>

								<Link to="/job/applied">
									View Resume <BsIcons.BsChevronDoubleRight />
								</Link>
							</div>
						</div>
					</div>
					<div
						className="divider"
						style={{
							marginTop:"20px",
							marginBottom:"20px"
						}}
					></div>
					<p className="info_text">
						<MdIcons.MdLocalActivity />
						Activity Log</p>
					<p className="info_text">
						<AiIcons.AiFillWarning />
						Please complete your profile to get started
					</p>
				</div>
			</div>
		</div>
	)
}

export default DashboardCard;