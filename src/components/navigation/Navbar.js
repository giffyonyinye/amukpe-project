import '../../assets/css/navbar.css';
import {Link} from "react-router-dom";
import * as VsIcons from "react-icons/vsc";

const Navbar = ({activeComponent, token}) => {

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
				{
					token?
					''
					:
					<>
						<li className="nav-item" id="sidebar_li">
							<Link to="/register">
								<VsIcons.VscSignIn />
								Sign Up
							</Link>
						</li>
						<li className="nav-item" id="sidebar_li">
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
	</header>
	)
}

export default Navbar;