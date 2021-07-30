import {Link} from "react-router-dom";
import community from "../assets/img/community.svg";
import achievements from "../assets/img/achievements.svg";
import job from "../assets/img/job.svg";

const Home = () => {
	return (
		<div className="container-fluid custom__container pt-5">
			<div className="row justify-content-center">
				<div className="col-xl-6">
					<h2 className="header_text">Amukpe Community</h2>
					<br />
					<p className="subheader_text">
						Creating Awareness and Opportunities in Amukpe Community.
						Oneness is strength, love and progress.
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/portal">	
							Portal
						</Link>
						<Link to="/blog">	
							Latest Updates
						</Link>
					</div>
				</div>
				<div className="col-xl-4">
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
				<div className="col-xl-6 columns">
					<img
						src={achievements}
						alt="JOBSVG"
						className="img-fluid"
					/>
				</div>
				<div className="col-xl-5 columns">
					<h2 className="header_text">Achiements & Development</h2>
					<br />
					<p className="subheader_text">
						Development of community billboard and organizing of empowerment 
						events.
						Creating job opportunities to indigenes and non-indegenes in the 
						community.
						lteh i have the love of the people to enable one understand the staet of
						the indigenes and non indegenes import communitySvg 
						from "../Images/Community.svg"; of the community. building oursleves
						 and 
						understand that the community needs progress and advancment of the
						 current 
						development jygfj hgyuthje yufasydghiuew tyfyssgfuiewyj udgfytfeuf 
						ueueyuiru 
						bytsyjhff yfhteruybs uwdtywjhydu gwyteyw jhghgdhgghhfdgsfdjjcv yyrrye
						yfdyf y 
						dgywqtfiv y ftyewty ud cshgc ctyduwtryu
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/portal">	
							View
						</Link>
					</div>
				</div>
			</div>
			<br />
			<br />
			<div className="row justify-content-center" id="row3">
				<div className="col-xl-5 columns">
					<h2 className="header_text">What We Are</h2>
					<br />
					<p className="subheader_text">
						Amukpe Community is a communitty in Sapele Delta State. With love and 
						unity dvfyd yfewu udhfh gdtf ht id tihin sth reasdon why you didnet shwi 
						iup T my place the otehr cay dont get uoddatedn eith the sstory of this 
						comunity we lovwe to keep it real and smooth all the dy of iut lives and 
						lives with it as kive hasa offered us with so much opportunities, dot sir 
						nad thunj that theh sroyt witg tr xgan an minert frim nie si that teh oeiolw 
						iof the kabn will yhfeuy yqyr ncgyewc the goodsa nd service if tey sdgfy 
						asjjyf yasid the minerb uu gdewv hkw qace thia sshidte i wiiudlf nt caome 
						back agian foir any reason s tat i iwill gaev my sdyfgyjc'
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/portal">	
							View
						</Link>
					</div>
				</div>
				<div className="col-xl-6 columns">
					<img
						src={achievements}
						alt="JOBSVG"
						className="img-fluid"
					/>
				</div>
			</div>
			<br />
			<div className="row justify-content-center" id="row2">
				<div className="col-xl-6 columns">
					<img
						src={job}
						alt="JOBSVG"
						className="img-fluid"
					/>
				</div>
				<div className="col-xl-5 columns">
					<h2 className="header_text">Looking for a Job?</h2>
					<br />
					<p className="subheader_text">
						Amukpe Community is a communitty in Sapele Delta State. 
						With love aand unity dvfyd yfewu udhfh gdtf ht id tihin 
						sth reasdon why any reason s tat i iwill gaev my sdyfgyjc'. 
						The community is here to help you.
					</p>

					<br />
					<br />

					<div className="header_button">
						<Link to="/apply">	
							Apply
						</Link>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
	)
}

export default Home;