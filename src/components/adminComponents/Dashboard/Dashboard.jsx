import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getByCategory, deleteProduct } from "../../../services/productsService";
import { formatPrice } from "../../../utils/formatPrice";
import { capitalize } from "../../../utils/capitalize";
import { ScreenMessage } from "../../ScreenMessage/ScreenMessage";

import "./Dashboard.css";

export const Dashboard = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const [ products, setProducts ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( false );

	const fetchProducts = () => {
		setLoading( true );
		setError( false );
		getByCategory()
			.then( ( data ) => setProducts( data ) )
			.catch( () => setError( true ) )
			.finally( () => setLoading( false ) );
	};

	useEffect( () => {
		fetchProducts();
	}, [] );

	const handleDelete = async ( id, name, category ) => {
		const confirmed = window.confirm( `Are you sure you want to delete "${ name }"?\n\nThis action cannot be undone.` );
		if ( !confirmed ) return;

		try {
			await deleteProduct( id );
			navigate( `/admin/products/success/${ id }`, {
				replace: true,
				state: {
					fromForm: true, // proteger ruta para que solo se pueda acceder desde el formulario
					category: category,
					action: "deleted"
				}
			} );

		} catch ( error ) {
			alert( `Failed to delete product: ${ error.message }` );
		};
	};

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<h2 className="tab-title">Dashboard</h2>
				<button type="button" onClick={ logout } className="dashboard-button">
					<img src="/img/assets/admin/Exit.png" width="16" height="16" alt="Edit" />
					<span>Log out</span>
				</button>
			</header>

			<section className="dashboard-actions">
				<button type="button" onClick={ () => fetchProducts() } className="dashboard-button">
					<img src="/img/assets/admin/Restart.png" width="16" height="16" alt="Edit" />
					<span>Refresh list</span>
				</button>
				<button type="button" onClick={ () => navigate( `/admin/products/new` ) } className="dashboard-button">
					<img src="/img/assets/admin/Plus.png" width="16" height="16" alt="Edit" />
					<span>New product</span>
				</button>
			</section>

			<section className="dashboard-products">
				<h3>Product list ({ products.length })</h3>

				{ loading && <ScreenMessage type="loading" /> }
				{ error   && <ScreenMessage type="error" /> }

				{ !loading && !error && (
					<table className="products-table">
						<thead>
							<tr>
								<th>Img</th>
								<th>ID</th>
								<th>Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Limit</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ products.map( ( product ) => (
								<tr key={ product.id }>
									<td>
										<img src={ product.image } alt="" width="32" height="32" />
									</td>
									<td className="text-bold">
										<Link to={ `/${ product.category }/${ product.id }` }>
											{ product.id }
										</Link>
									</td>
									<td>{ product.name }</td>
									<td>{ capitalize( product.category ) }</td>
									<td className="text-numerical">{ formatPrice( product.price ) }</td>
									<td className="text-numerical">{ product.order_limit }</td>
									<td>
										<button type="button" onClick={ () => navigate( `/admin/products/edit/${ product.id }` ) } className="dashboard-button">
											<img src="/img/assets/admin/Pencil.png" width="16" height="16" alt="Edit" />
										</button>
									</td>
									<td>
										<button type="button" onClick={ () => handleDelete( product.id, product.name, product.category ) } className="dashboard-button">
											<img src="/img/assets/admin/Trashbin.png" width="16" height="16" alt="Remove" />
										</button>
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
				) }
			</section>
		</div>
	);
};