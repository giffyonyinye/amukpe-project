import '../../assets/css/navbar.css';
import {Link} from "react-router-dom";
import * as VsIcons from "react-icons/vsc";
import * as TiIcons from "react-icons/ti";
import {useState} from "react";

const Navbar = ({activeComponent, token}) => {

	const [showNav, setShowNav] = useState(false);

	const toggleNavbar = (e) => {
		e.preventDefault();
		setShowNav(!showNav);
	}

	return (
	<header className="custom__header">
		<nav className="navbar navbar-expand custom__navbar">
			<Link className="navbar-brand navbar__brand" to="/">
				Amukpe Community<i>.</i>
			</Link>
			<nav className="nav_content first">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/contact">Contact</Link>
					</li>
					<li className="nav-item">
						<Link to="/jobopenings">Jobs</Link>
					</li>
				</ul>
			</nav>
			<nav className="nav_content second">
				<ul className="navbar-nav">
					<li className="nav-item" id="sidebar_list">
						<Link
							to="/navbar"
							id="sidebar_li"
							onClick={toggleNavbar}
						>
							Menu
							<VsIcons.VscThreeBars />
						</Link>
					</li>
				{
					token?
					<li className="nav-item" id="dashboard_li">
						<Link
							to="/dashboard"
						>
							Dashboard
							<VsIcons.VscThreeBars />
						</Link>
					</li>
					:
					<>
						<li className="nav-item">
							<Link to="/register">
								<VsIcons.VscSignIn />
								Sign Up
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/login">
								<VsIcons.VscSignIn />
								Sign In
							</Link>
						</li>
					</>
				}
				</ul>
			</nav>
		</nav>

		{
			showNav?
			<nav className="fixed-top navbar navbar-expand dropdown_nav">
				<nav>
					<ul className="dropdown__ul" id="dropdown__ul">
						<div>
							<TiIcons.TiTimes
								onClick={toggleNavbar}
							/>
						</div>
						<li className="nav-item">
							<Link to="/" className="active">
							Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/contact">
							Contact</Link>
						</li>
						<li className="nav-item">
							<Link to="/jobopenings">
							Jobs</Link>
						</li>
						{
							token?
							<li className="nav-item">
								<Link to="/dashboard">
								Dashboard</Link>
							</li>
							:
							<>
							</>
						}
					</ul>
				</nav>
			</nav>:''
		}
	</header>
	)
}

export default Navbar;


// I'LL WRITE A REASON WHY I HATED FEMALES GROWING UP
// i'LL ALSO SEARCH FOR MAVIS BEACON ALTERNATIVES FOR LINUX