import * as ImIcons from "react-icons/im";

const LoadingDiv = () => {
	return (
		<div className="d-flex justify-content-center" id="loading__div">
			<p>
				<ImIcons.ImSpinner10 />
			</p>
		</div>
	)
}

export default LoadingDiv;