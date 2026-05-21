import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export const CartSummary = () => {

	const { getCartTotal, checkout } = useCart();
	const total = getCartTotal();

	return (
		<tfoot>
			<tr>
				<td className="text-bold" colSpan="3">Total:</td>
				<td className="text-numerical" colSpan="2">{ formatPrice( total ) }</td>
			</tr>
			<tr>
				<td colSpan="5">
					<div className="flex-container">
						<button className="checkout" onClick={ checkout }>Checkout</button>
					</div>
				</td>
			</tr>
		</tfoot>
	);
};