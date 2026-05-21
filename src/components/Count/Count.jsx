import { useCart } from "../../context/CartContext";
import "./Count.css"

export const Count = ({ item }) => {

	// obtener información y utils del carrito
	const { getItemQuantity, addItem, removeItem } = useCart();
	const quantity = getItemQuantity( item.id );

	return (
		<div className="counter-container">
			<button className="counter" onClick={ () => { removeItem( item ) } } disabled={ quantity === 0 }>-</button>

			<p className="counter-number text-numerical">{ quantity }</p>

			<button className="counter" onClick={ () => { addItem( item ) } }>+</button>
		</div>
	);
};