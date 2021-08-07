import {Link} from "react-router-dom";
import Footer from "./Footer";
import community from "../assets/img/communitySvg.svg";
import achievements from "../assets/img/achievements.svg";
import about from "../assets/img/aboutSvg.svg";
import job from "../assets/img/job.svg";


const Home = () => {
	return (
		<div className=" pt-5" >
			<div className="row justify-content-center">
				<div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4" style={{paddingTop:"5rem"}}>
					<h2 className="header_text">Amukpe Community</h2>
					<br />
					<p className="subheader_text">
						Creating Awareness and Opportunities in Amukpe Community.
						Oneness is strength, love and progress.
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/register">	
							Portal
						</Link>
						<Link to="/dashboard">	
							Sign In	
						</Link>
					</div>
				</div>
				<div className="col-xl-4 col-lg-4 col-md-5" style={{marginTop:"2rem"}}>
					<img
						src={community}
						alt="JOBSVG"
						className="img-fluid"
					/>
				</div>
			</div>
			<br />
			<br />
			<div className="row justify-content-center" id="row2">

				<div className="col-xl-6 col-lg-5 col-md-6 columns">
					<img
						src={achievements}
						alt="JOBSVG"
						className="img-fluid image-svg"
					/>
				</div>
				
				<div className="col-xl-5 col-lg-6 col-md-6 columns">
					<h2 className="header_text">Achiements & Development</h2>
					<br />
					<p className="subheader_text">
						Development of youth empowerment schemes, educating youths on self development and learning skills.  
						We have succeded in creating job opportunities to indigenes and non-indegenes of Okpe community at large.
										
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/about">	
							View
						</Link>
					</div>
				</div>

				
			</div>
			<br />
			<br />
			<div className="row justify-content-center" id="row3" >
				<div className="col-xl-6 col-lg-5 col-md-6 columns">
					<img
						src={about}
						alt="JOBSVG"
						className="img-fluid image-svg"
					/>
				</div>
				<div className="col-xl-5 col-lg-6 col-md-6 columns">
					<h2 className="header_text">What We Are</h2>
					<br />
					<p className="subheader_text">
						Amukpe Community is a community situated in Sapele Local Government of Delta State. We established this platform to 
						improve the standard of the community and create awareness to our people. One main aim of this platform
						is to provide job opportunities to indigenes and non-indigenes of Okpe Kingdom at large and in diaspora. 
						
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/about">	
							View
						</Link>
					</div>
				</div>
				
			</div>
			<br />
			<div className="row justify-content-center" id="row2">
				<div className="col-xl-6 col-lg-5 col-md-6 columns">
					<img
						src={job}
						alt="JOBSVG"
						className="img-fluid image-svg"
					/>
				</div>
				<div className="col-xl-5 col-lg-6 col-md-6 columns">
					<h2 className="header_text">Looking for a Job?</h2>
					<br />
					<p className="subheader_text">
						The commmunity is here to help you with job opportunities, you are just one step away. We have so many job openings waiting for you. Don't miss out.
						 Register and start applying.
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/jobOpenings">	
							Apply
						</Link>
					</div>
				</div>
			</div>
			
			<div>
			<Footer/>
			</div>
		</div>
	)
}

export default Home;
