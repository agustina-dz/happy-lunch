import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";

export const CartList = () => {

	const { cart } = useCart();

	return (
		<tbody>
			{ cart.map( element => (
				<CartItem key={ element.id } item={ element } />
			) ) }
		</tbody>
	);
};