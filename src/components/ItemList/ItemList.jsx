import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ products }) => {
	return (
		<div className="product-list">
			{ products.map( product => (
				<Link to={ `/${ product.category }/${ product.id }` } key={ product.id }>
					<Item { ...product } />
				</Link>
			)) }
		</div>
	);
};