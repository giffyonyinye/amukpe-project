import {Route, Switch} from "react-router-dom";
import "../assets/css/dashboard.css";
import DashboardCard from "../components/card/DashboardCard";
import ProfileCard from "../components/card/ProfileCard";
import SettingsCard from "../components/card/SettingsCard";
import ResumeCard from "../components/card/ResumeCard";
import JobAlertsCard from "../components/card/JobAlertsCard";
import DashboardJobCard from "../components/card/DashboardJobCard";
import DashboardSidebar from "../components/navigation/DashboardSidebar";
import SingleJobCard from "../components/card/SingleJobCard";
import SingleUserCard from "../components/card/SingleUserCard";
import axios from "axios";
import {useState, useEffect} from "react";

import Admin from "./admin/Admin";

const Dashboard = ({current_user, logout, token, devApi, devURL,
 	reloadUser, changedPassword, setChangedPassword}) => {

	const [jobListing, setJobListing] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			setJobListing(res.data.jobs);
		});
	}, [token, devApi]);

	const reloadJobs = () => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}jobs/get/all/`,
		}).then((res) => {
			setJobListing(res.data.jobs);
		});	
	}

	return (
		<div className="container-fluid custom__container pt-5">
			<div className="row justify-content-center" style={{marginTop:"6rem"}}>
				<DashboardSidebar
					logout={logout}
					current_user={current_user}
				/>

				<Switch>
					<Route path={`/dashboard/jobs/:id`}>
						<SingleJobCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
							reloadSidebarJob={reloadJobs}
						/>
					</Route>
					<Route path={`/dashboard/users/:email`}>
						<SingleUserCard
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
						/>
					</Route>
					{
						current_user.password !== "dukeofamukpe*"?
						<>
							<Route exact path={`/dashboard`}>
								<DashboardCard
									current_user={current_user}
									token={token}
									devApi={devApi}
									devURL={devURL}
									reloadUser={reloadUser}
									setChangedPassword={setChangedPassword}
									changedPassword={changedPassword}
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
						</>
						:
						<>
						<Admin
							current_user={current_user}
							token={token}
							devApi={devApi}
							devURL={devURL}
							reloadUser={reloadUser}
							reloadJobs={reloadJobs}
						/>
						</>
					}

				</Switch>
				<JobAlertsCard
					current_user={current_user}
					token={token}
					devApi={devApi}
					devURL={devURL}
					reloadUser={reloadUser}
					jobListing={jobListing}
				/>
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
