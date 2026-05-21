import { useCart } from "../../context/CartContext";
import { CartHeader } from "./CartHeader";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { ScreenMessage } from "../ScreenMessage/ScreenMessage";
import "./CartView.css";

export const CartView = () => {

	const { cart } = useCart()

	return (
		<>
			<h2 className="tab-title">Cart</h2>
			<section className="cart">

				{ cart.length ? (
					<table>
						<CartHeader />
						<CartList />
						<CartSummary />
					</table>
				) : (
					<ScreenMessage type="emptyCart" />
				) }

			</section>
		</>
	);
};