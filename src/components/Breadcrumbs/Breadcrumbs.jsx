import { Link } from "react-router-dom";
import { capitalize } from "../../utils/capitalize";
import "./Breadcrumbs.css";

export const Breadcrumbs = ({ itemName, category }) => {
	return (
		<nav className="breadcrumbs">
			<ol>
				{ /* ruta de navegación: página principal */ }
				<li><Link to="/">All Products</Link></li>

				{ /* ruta de navegación: categoría */ }
				{ category && (
					<li><Link to={ `/${ category }` }>{ capitalize( category ) }</Link></li>
				) }

				{ /* ruta de navegación (sin vínculo): producto */ }
				{ itemName && (
					<li><span>{ itemName }</span></li>
				) }
			</ol>
		</nav>
	);
};