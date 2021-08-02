import AvatarImg from "../../assets/img/avatar.png";
import {Link} from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";

const SidebarContent = [
	{
		title: "Dashboard",
		icon: <AiIcons.AiOutlineIdcard />,
		link: "dashboard",
		className: "active",
	},
	{
		title: "Profile",
		icon: <BiIcons.BiUserCircle />,
		link: "dashboard/profile",
		className: "",
	},
	{
		title: "Resume",
		icon: <HiIcons.HiOutlineDocumentDuplicate />,
		link: "dashboard/resume",
		className: "",
	},
	{
		title: "Jobs",
		icon: <BiIcons.BiBriefcase />,
		link: "dashboard/jobs",
		className: "",
	},
	{
		title: "Account Settings",
		icon: <GiIcons.GiPokecog />,
		link: "dashboard/settings",
		className: "",
	},
]

const AdminSidebarContent = [
	{
		title: "Dashboard",
		icon: <AiIcons.AiOutlineIdcard />,
		link: "dashboard",
		className: "active",
	},
	{
		title: "Users",
		icon: <BiIcons.BiUserCircle />,
		link: "dashboard/users",
		className: "",
	},
	{
		title: "Jobs",
		icon: <BiIcons.BiBriefcase />,
		link: "dashboard/jobs",
		className: "",
	},
]

const DashboardSidebar = ({logout, current_user}) => {
	return (
		<>
			<div className="col-xl-2 pl-0 pr-1">
				<div className="card dashboard_sidebarcard">
					<div className="header">
						<img
							className="avatar_img"
							alt="AvatarImg"
							src={AvatarImg}
						/>
						<p>
							<span>Hello, {current_user.firstname}</span>
							<br />
							<i>
								<BsIcons.BsFillCircleFill />
								Online
							</i>
						</p>
					</div>
					<div className="body">
						<ul>
							{
								current_user.password === "admin_login_id"?
								<>
								{
									AdminSidebarContent.map((value, index) => {
										return(
											<li key={index}>
												<Link
													to=
													{`/${value.link}`}
													className={`${value.className}`}
												>
													{value.icon}
													{value.title}
												</Link>
											</li>
										)
									})
								}
								</>
								:
								<>
								{
									SidebarContent.map((value, index) => {
										return(
											<li key={index}>
												<Link
													to=
													{`/${value.link}`}
													className={`${value.className}`}
												>
													{value.icon}
													{value.title}
												</Link>
											</li>
										)
									})
								}
								</>
							}
						</ul>
					</div>
					<div className="footer">
						<span onClick={logout}>
							<RiIcons.RiLogoutCircleLine />
							Logout
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardSidebar;