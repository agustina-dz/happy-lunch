import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import { IngredientsListContainer } from "../IngredientsListContainer/IngredientsListContainer";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Count } from "../Count/Count";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
	return (
		<>
			{ /* ruta de navegación -> página principal > categoría > producto */ }
			<Breadcrumbs category={ item.category } itemName={ item.name } />

			<div className="item-detail">

				{ /* reutilización de Item */ }
				<Item { ...item }>
					<Count item={ item } />
					<Link className="action-button" to="/cart">Go to Cart</Link>
				</Item>

				{ /* lista de ingredientes de un producto */ }
				{ item.ingredients.length ? <IngredientsListContainer { ...item } /> : null }
			</div>
		</>
	);
};