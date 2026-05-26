import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Count } from "../Count/Count";
import { formatPrice } from "../../utils/formatPrice";

export const CartItem = ({ item }) => {

	const { addItem, removeItem, deleteItem } = useCart();

	return (
		<tr>
			<td>
				<div className="flex-container">
					<img src={ item.image } alt="" />
					<Link className="text-bold" to={ `/${ item.category }/${ item.id }` }>
						{ item.name }
					</Link>
				</div>
			</td>

			<td className="text-numerical">
				<Count
					onIncrement={ () => addItem( item ) }
					onDecrement={ () => removeItem( item ) }
					value={ item.quantity }
				/>
			</td>

			<td className="text-numerical">
				{ formatPrice( item.price ) }
			</td>

			<td className="text-numerical">
				{ formatPrice( item.price * item.quantity ) }
			</td>

			<td>
				<div className="flex-container">
					<button className="remove" onClick={ () => deleteItem( item ) } >X</button>
				</div>
			</td>
		</tr>
	);
};