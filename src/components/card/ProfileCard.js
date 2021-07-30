import "../../assets/css/profile.css";
import AvatarImg from "../../assets/img/avatar.png";
//import {Link} from "react-router-dom";
import Moment from 'react-moment';

const ProfileCard = ({current_user}) => {
	return(
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card profile__card">
				<div className="header">
					<img
						src={AvatarImg}
						alt="profilePicture"
						className="avatar_img"
					/>
					<p>
						{current_user.firstname} {current_user.lastname}
						<span>Joined: <Moment format="YYYY/MM/DD">
								{current_user.date_joined}</Moment>
						</span>
						<span>
							{
								current_user.gender !== undefined?
								`Gender: ${current_user.gender}`:''
							}
						</span>
					</p>
				</div>

				<div className="body">
					<div
						className="divider"
						style={{
							marginTop: "0px",
							marginBottom: "0px",
							padding: "0.4px",
						}}
					></div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard;