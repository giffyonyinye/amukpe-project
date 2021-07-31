import "../../assets/css/profile.css";
import AvatarImg from "../../assets/img/avatar.png";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
//import {useState} from "react";

const ProfileCard = ({current_user, devURL}) => {
	return(
		<>
			{
				current_user !== null?
				<div className="col-xl-5 pl-2 pr-1">

					<div className="card profile__card">
						<div className="header">
							{
								current_user.profile_picture === "default.webp"?
								<img
									src={AvatarImg}
									alt="profilePicture"
									className="avatar_img"
								/>
								:
								<img
									src={`${devURL}img/profile/
									${current_user.profile_picture}`}
									alt="profilePicture"
									className="avatar_img"
								/>
							}
							<p>
								{current_user.firstname} {current_user.lastname} - 
									@{current_user.email}
								<span>Joined: <Moment format="YYYY/MM/DD">
										{current_user.date_joined}</Moment>
								</span>
								<span>
									{
										current_user.gender !== undefined?
										`Gender: ${current_user.gender}`:''
									}
								</span>
								<span>
									{
										current_user.qualification !== undefined?
										`Qualification: ${current_user.qualification}`:''
									}
								</span>
								<span>
									{
										current_user.cv !== undefined?
										<>Resume: 
										<Link
											to={`/preview/file/${current_user.cv}/`}> 
												{current_user.cv}
										</Link></>:''
									}
								</span>
							</p>
						</div>

						<div className="body">
							<div
								className="divider"
								style={{
									marginTop: "0px",
									marginBottom: "15px",
									padding: "0.4px",
								}}
							></div>

							<img
								src={`${devURL}img/passport/${current_user.passport}`}
								alt="passportImg"

								className="passport_img"
							/>

							<span className="active">
								{
									current_user.dob !== undefined?
									<>Date Of Birth: <Moment format="DD/MM/YYYY">
										{current_user.dob}</Moment></>:''
								}
							</span>
							<span>
								{
									current_user.address !== undefined?
									<>Current Address: {current_user.address}</>:''
								}
							</span>
							<span>
								{
									current_user.state !== undefined?
									<>State: {current_user.state}</>:''
								}
							</span>
							<span>
								{
									current_user.city !== undefined?
									<>City: {current_user.city}</>:''
								}
							</span>
						</div>
					</div>
				</div>:''
			}
		</>
	)
}

export default ProfileCard;