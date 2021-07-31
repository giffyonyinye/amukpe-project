import {useState} from "react";
import axios from "axios";
import * as ImIcons from "react-icons/im";

const ResumeCard = ({current_user, token, devApi, reloadUser}) => {

	const [saving, setSaving] = useState(false);

	const [cv, setCv] = useState({});
	const [passport, setPassport] = useState({});
	const [profile_picture, setProfilePicture] = useState({});
	const [qualification, setQualification] = useState(current_user.qualification);

	const saveResume = (e) => {
		e.preventDefault();
		setSaving(true);
		var form_data = new FormData();

		console.log('sending...')

		form_data.append("qualification", qualification);
		form_data.append("resume", cv);
		form_data.append("passport", passport);
		form_data.append("profile", profile_picture)

		axios({
			method: "PUT",
			data: form_data,
			headers: {
				'Authorization': token
			},
			url: `${devApi}user/${current_user._id}/update/resume/`,
		}).then((res) => {
			setSaving(false);
			console.log(res.data);
			reloadUser();
		});

	}

	return(
		<div className="col-xl-5 pl-2 pr-1">
			<div className="card resume__card">
				<div className="header">
					<p>
						Resume (Curriculum Vitae)
						<span>Upload your CV and complete your educational experience</span>
					</p>
				</div>

				<div className="body">
					<div
						className="divider"
						style={{
							marginTop: "5px",
							marginBottom: "15px",
							padding: "0.4px",
						}}
					></div>

					<form onSubmit={saveResume}>
						<div className="row">
							<div className="col-xl-6">
								<div className="form-group">
									<label
										htmlFor="cv_fileupload"
										className="resume__filelabel"
									>CV Upload</label>
									<br />
									<input
										type="file"
										id="cv_fileupload"
										className="resume_fileupload"
										accept=".doc, .docx, application/pdf, application/msword, 
											application/vnd.openxmlformats-officedocument.
											wordprocessingml.document"
										onChange={(e) => setCv(e.target.files[0])}
									/>
								</div>
							</div>
							<div className="col-xl-6">
								<div className="form-group">
									<label
										htmlFor="passport_imgupload"
										className="resume__filelabel"
									>Upload Passport</label>
									<br />
									<input
										type="file"
										id="passport_imgupload"
										className="resume_fileupload"
										accept=".png, .jpg, .webp, .jfif"
										onChange={(e) => setPassport(e.target.files[0])}
									/>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-xl-6">
								<div className="form-group">
									<label
										htmlFor="profile_imgupload"
										className="resume__filelabel"
									>Upload Profile Picture</label>
									<br />
									<input
										type="file"
										id="profile_imgupload"
										className="resume_fileupload"
										accept=".png, .jpg, .webp, .jfif"
										onChange={(e) => setProfilePicture(e.target.files[0])}
									/>
								</div>
							</div>

							<div className="col-xl-6">
								<div className="form-group">
									<label
										htmlFor="resume_educationlevel"
										className="resume__filelabel"
									>Highest Level Of Education</label>
									<br />
									<select
										id="resume_educationlevel"
										className="form-control auth__input"
										value={qualification}
										onChange={(e) => setQualification(e.target.value)}
									>
										<option selected disabled>
											Choose Qualification
										</option>
										<option value="o'level">O'Level</option>
										<option value="b.sc">B.Sc</option>
										<option value="m.sc">M.Sc</option>
										<option value="phd">PhD</option>
									</select>
								</div>
							</div>
						</div>

						<div className="save__button">
							<button type="submit" id="save__button">
								{
									saving?
									<ImIcons.ImSpinner4 />
									:'Save'
								} 
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ResumeCard;