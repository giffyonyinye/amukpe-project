import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";

const DashboardCard = ({current_user}) => {
	return(
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card dashboard_card">
				<div className="header">
					<p>Dashboard</p>
				</div>
				<div className="body">
					<div className="row">
						<div className="col-xl-6 progress_cardcol">
							<div className="card progress_cards">
								<span>Jobs Applied To: {current_user.applied_to}</span>
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