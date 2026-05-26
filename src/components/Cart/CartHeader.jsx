export const CartHeader = () => {
	return (
		<>
			<caption className="text-bold">Happy Lunch !</caption>
			<colgroup>
				<col className="col-name" />
				<col className="col-quantity" />
				<col className="col-unit-price" />
				<col className="col-subtotal" />
				<col className="col-buttons" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">Product</th>
					<th scope="col" aria-label="Quantity">Qty</th>
					<th className="text-start" scope="col">Unit price</th>
					<th className="text-start" scope="col">Price</th>
					<th scope="col"></th>
				</tr>
			</thead>
		</>
	)
};