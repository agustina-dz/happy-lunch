import { Link } from "react-router-dom";
import "./Message.css";

export const Message = ({ image, message, homeLink }) => {
	return (
		<div className="message-container">
			<img src={ `/img/assets/screen/${ image }.png` } width="256" height="256" alt="" />

			<p>{ message }</p>

			{ homeLink && (
				<p className="home-link text-bold">
					<Link to="/">Go back to All Products</Link>
				</p>
			) }
		</div>
	);
};