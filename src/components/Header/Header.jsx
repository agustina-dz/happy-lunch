import { Link } from "react-router-dom";
import { getRandomLogo } from "./getRandomLogo";
import { Nav } from "../Nav/Nav";
import "./Header.css";

// obtener un logo diferente cada vez que se carga la página
const logoImage = getRandomLogo();

export const Header = () => {
	return (
		<header>
			<div className="logo-container">
				<Link to="/">
					<img src={`/img/assets/logo/${ logoImage }.png`} width="128" height="128" alt="" />
					<h1>Happy Lunch !</h1>
				</Link>
			</div>
			<Nav />
		</header>
	);
};