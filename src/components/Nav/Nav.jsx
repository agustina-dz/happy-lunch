import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { NavItem } from "./NavItem";
import "./Nav.css";

// items de navegación con labels, rutas e imágenes
export const NAV_ITEMS = [
	{ label: "All Products",		path: "/",				image: "/img/assets/nav/banana.png" },
	{ label: "Mains",				path: "/mains",			image: null },
	{ label: "Drinks",				path: "/drinks",		image: null },
	{ label: "Bakery",				path: "/bakery",		image: null },
	{ label: "Desserts",			path: "/desserts",		image: null },
	{ label: "Cart",				path: "/cart",			image: "/img/assets/nav/basket.png" },
];

export const Nav = () => {

	const { getTotalItems } = useCart();
	const totalItems = getTotalItems();

	return (
		<nav className="main-navigation">
			<ul>
				{ NAV_ITEMS.map( ( navItem ) => (

					// enviar información del contador únicamente cuando se trate del carrito
					<NavItem key={ navItem.path } { ...navItem } counter={ navItem.label === "Cart" && totalItems } />

				)) }
			</ul>
		</nav>
	);
};