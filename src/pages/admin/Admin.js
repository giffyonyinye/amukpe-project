import {Switch, Route} from "react-router-dom";
import AdminDashboard from "./components/card/AdminDashboard";
import DashboardJobCard from "../../components/card/DashboardJobCard";
import UsersDashboard from "./components/card/UsersDashboard";

const Admin = ({current_user, token, devApi, devURL, reloadUser}) => {
	return (
		<>
			<Switch>
				<Route exact path={`/dashboard`}>
					<AdminDashboard
						current_user={current_user}
						token={token}
						devApi={devApi}
						devURL={devURL}
						reloadUser={reloadUser}
					/>
				</Route>
				<Route exact path={`/dashboard/jobs`}>
					<DashboardJobCard
						current_user={current_user}
						token={token}
						devApi={devApi}
						devURL={devURL}
						reloadUser={reloadUser}
					/>
				</Route>
				<Route exact path={`/dashboard/users`}>
					<UsersDashboard
						current_user={current_user}
						token={token}
						devApi={devApi}
						devURL={devURL}
						reloadUser={reloadUser}
					/>
				</Route>
				<Route>
					<h1>Not Found </h1>
				</Route>
			</Switch>
		</>
	)
}

export default Admin;