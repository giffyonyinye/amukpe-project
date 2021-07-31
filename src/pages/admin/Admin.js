import {Switch, Route} from "react-router-dom";
import AdminDashboard from "./components/card/AdminDashboard";

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
				<Route exact path={`/dashboard/profile`}>
					<p>Welcome Admin Profile</p>
				</Route>
				<Route exact path={`/dashboard/jobs`}>
					<p>Welcome Admin Jobs</p>
				</Route>
				<Route exact path={`/dashboard/settings`}>
					<p>Welcome Admin Settings</p>
				</Route>
			</Switch>
		</>
	)
}

export default Admin;