import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";

export const Header = () => {
	return (
		<header>
			<div className="logo-container">
				<Link to="/admin">
					<img src={`/img/assets/logo/admin.png`} width="128" height="128" alt="" />
					<h1>Admin Panel</h1>
				</Link>
			</div>
			<Nav />
		</header>
	);
};