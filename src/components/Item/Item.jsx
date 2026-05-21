import { formatPrice } from "../../utils/formatPrice";
import "./Item.css";

export const Item = ({ image, name, description, price, category, children }) => {

	return (
		<article className={`item ${ category }`}>

			<div className="title">
				<img src={ image } width="32" height="32" alt="" />
				<h3 className="name">{ name }</h3>
			</div>

			<p className="description">{ description }</p>
			<p className="pricing text-numerical">{ formatPrice( price ) }</p>

			{ children }

		</article>
	);
};