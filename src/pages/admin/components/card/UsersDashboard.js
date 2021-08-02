import {useState, useEffect} from "react";
import axios from "axios";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import AvatarImg from "../../../../assets/img/avatar.png"


const UsersDashboard = ({token, devApi, devURL}) => {

	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			headers: {
				'Authorization': token
			},
			url: `${devApi}users/`,
		}).then((res) => {
			setUsers(res.data.users);
		});
	}, [token, devApi])

	return (
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card dashboard_card users_dashboardcard">
				<div className="header">
					<p>All Users</p>
				</div>
				<div className="body">
					{
						users.length !== 0?
						users.map((value, index) => {
							return(
								<SingleUser
									user={value}
									key={index}
									devURL={devURL}
								/>
							)
						})
						:''
					}
				</div>
			</div>
		</div>
	)
}

const SingleUser = ({user, devURL}) => {
	return (
		<>
			{
				user.email !== "admin@gmail.com"?
				<div className="card job_dashboard_singlecards">
					{
						user.profile_picture === "default.webp"?
						<img
							src={AvatarImg}
							alt="jobIcon"
						/>
						:
						<img
							src={`${devURL}img/profile/${user.profile_picture}`}
							alt="jobIcon"
						/>
					}
					<span id="first">{user.title}</span>
					<div className="pl-2 pt-2 pb-1">
						<span><i>Name: </i>{user.firstname} {user.lastname}</span>
						<span><i>Joined On:</i> <Moment format="DD MMM YYYY">
						{user.date_joined}</Moment></span>
					</div>
					<div className="d-flex justify-content-end">
						<Link to={`/dashboard/users/${user.email}`}>
							View User
						</Link>
					</div>
				</div>:''
			}
		</>
	)
}

export default UsersDashboard;