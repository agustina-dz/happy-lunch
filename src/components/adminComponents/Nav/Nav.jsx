import { Link } from "react-router-dom";
import { NavItem } from "../../Nav/NavItem";

const ADMIN_ITEMS = [
	{ label: "Dashboard",	path: "/admin",		image: "/img/assets/nav/banana.png" },
	{ label: "Store",		path: "/",			image: "/img/assets/nav/basket.png" },
];

export const Nav = () => {
	return (
		<nav className="main-navigation">
			<ul>
				{ ADMIN_ITEMS.map( ( navItem ) => <NavItem key={ navItem.path } { ...navItem } counter={ 0 } /> ) }
			</ul>
		</nav>
	);
};