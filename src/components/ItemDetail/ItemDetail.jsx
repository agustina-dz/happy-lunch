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

	// agregar producto al carrito y resetear el quantity local
	const addToCart = () => {
		addItem( item, quantity );
		setQuantity( 1 );
	};

	return (
		<>
			{ /* ruta de navegación: página principal > categoría > producto */ }
			<Breadcrumbs category={ item.category } itemName={ item.name } />

			<div className="item-detail">

				{ /* reutilización de Item */ }
				<Item { ...item }>

					{ /* contador: configurar la cantidad que se va a enviar al carrito */ }
					<Count
						onIncrement={ () => setQuantity( quantity => quantity + 1 ) }
						onDecrement={ () => setQuantity( quantity => quantity - 1 ) }
						value={ quantity }
					/>

					{ /* botón: agregar producto al carrito */ }
					<button className="action-button" onClick={ addToCart } disabled={ quantity === 0 }>
						Add to Cart
					</button>

				</Item>

				{ /* detalle: lista de ingredientes de un producto */ }
				{ item.ingredients.length ? <IngredientsListContainer { ...item } /> : null }
			</div>
		</>
	);
};