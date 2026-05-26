import { useState } from "react";
import { Item } from "../Item/Item";
import { IngredientsListContainer } from "../IngredientsListContainer/IngredientsListContainer";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Count } from "../Count/Count";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {

	const { addItem } = useCart();

	// manejar quantity localmente ( agregar varias unidades del mismo producto al carrito )
	const [ quantity, setQuantity ] = useState( 1 );

	const addToCart = () => {
		addItem( item, quantity );
		setQuantity( 1 );
	};

	return (
		<>
			<Breadcrumbs category={ item.category } itemName={ item.name } />

			<div className="item-detail">
				<Item { ...item }>

					<Count
						onIncrement={ () => setQuantity( quantity => quantity + 1 ) }
						onDecrement={ () => setQuantity( quantity => quantity - 1 ) }
						value={ quantity }
					/>

					<button className="action-button" onClick={ addToCart } disabled={ quantity === 0 }>
						Add to Cart
					</button>

				</Item>

				{ item.ingredients.length ? <IngredientsListContainer { ...item } /> : null }
			</div>
		</>
	);
};