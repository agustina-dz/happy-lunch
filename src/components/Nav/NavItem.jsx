import { Link } from "react-router-dom";

export const NavItem = ({ label, path, image, counter = 0 }) => {
	return (
		<li className="text-bold">
			<Link to={ path }>
				{ image && <img src={ image } alt={ label } /> }
				{ label }
			</Link>

			{/* mostrar el contador únicamente cuando haya items en el carrito */}
			{ counter > 0 && <span className="text-numerical text-bold">[ { counter } ]</span> }
		</li>
	);
};