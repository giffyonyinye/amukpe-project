import {Route, Switch} from "react-router-dom";
import "../assets/css/dashboard.css";
import DashboardCard from "../components/card/DashboardCard";
import ProfileCard from "../components/card/ProfileCard";
import SettingsCard from "../components/card/SettingsCard";
import ResumeCard from "../components/card/ResumeCard";
import JobAlertsCard from "../components/card/JobAlertsCard";
import DashboardJobCard from "../components/card/DashboardJobCard";
import DashboardSidebar from "../components/navigation/DashboardSidebar";

const Dashboard = ({current_user, logout, token, devApi, devURL, reloadUser}) => {
	return (
		<div className="container-fluid custom__container pt-5">
			<div className="row justify-content-center">
				<DashboardSidebar
					logout={logout}
					current_user={current_user}
				/>

				<Switch>
					<Route exact path={`/dashboard`}>
						<DashboardCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
						/>
					</Route>
					<Route path={`/dashboard/profile`}>
						<ProfileCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
						/>
					</Route>
					<Route path={`/dashboard/settings`}>
						<SettingsCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
						/>
					</Route>
					<Route path={`/dashboard/resume`}>
						<ResumeCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
						/>
					</Route>
					<Route path={`/dashboard/jobs`}>
						<DashboardJobCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
						/>
					</Route>
				</Switch>
				<JobAlertsCard />
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	)
}

export default Dashboard;