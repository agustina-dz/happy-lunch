import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Count } from "../Count/Count";
import { formatPrice } from "../../utils/formatPrice";

export const CartItem = ({ item }) => {

	const { deleteItem } = useCart();

	return (
		<tr>
			{ /* imagen + nombre del producto */ }
			<td>
				<div className="flex-container">
					<img src={ item.image } alt="" />
					<Link className="text-bold" to={ `/${ item.category }/${ item.id }` }>
						{ item.name }
					</Link>
				</div>
			</td>

			{ /* reutilizar contador para mostrar/modificar quantity */ }
			<td className="text-numerical">
				<Count item={ item } />
			</td>

			{ /* precio individual del producto */ }
			<td className="text-numerical">
				{ formatPrice( item.price ) }
			</td>

			{ /* precio total del producto (quantity) */ }
			<td className="text-numerical">
				{ formatPrice( item.price * item.quantity ) }
			</td>

			{ /* botón: eliminar producto del carrito */ }
			<td>
				<div className="flex-container">
					<button className="remove" onClick={ () => deleteItem( item ) } >X</button>
				</div>
			</td>
		</tr>
	);
};