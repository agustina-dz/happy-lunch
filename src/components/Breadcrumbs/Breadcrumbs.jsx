import { Link } from "react-router-dom";
import { capitalize } from "../../utils/capitalize";
import "./Breadcrumbs.css";

export const Breadcrumbs = ({ itemName, category }) => {
	return (
		<nav className="breadcrumbs">
			<ol>
				<li><Link to="/">All Products</Link></li>

				{ category && (
					<li><Link to={ `/${ category }` }>{ capitalize( category ) }</Link></li>
				) }

				{ itemName && (
					<li><span>{ itemName }</span></li>
				) }
			</ol>
		</nav>
	);
};