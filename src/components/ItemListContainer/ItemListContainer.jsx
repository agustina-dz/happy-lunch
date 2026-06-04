import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getByCategory } from "../../services/productsService";
import { capitalize } from "../../utils/capitalize";
import { ItemList } from "../ItemList/ItemList";
import { ScreenMessage } from "../ScreenMessage/ScreenMessage";

const VALID_CATEGORIES = [ "mains", "drinks", "bakery", "desserts" ];

export const ItemListContainer = () => {
	const { category } = useParams();
	const invalidCategory = category && !VALID_CATEGORIES.includes( category );

	const [ products, setProducts ] = useState( [] );
	const [ loading, setLoading ] = useState( true );

	useEffect( () => {
		// saltear el fetch si la categoría no es válida
		if ( invalidCategory ) {
			setLoading( false );
			return;
		};

		setLoading( true );

		getByCategory( category )
			.then( ( data ) => setProducts( data ) )
			.catch( ( fetchError ) => {
				console.error( fetchError );
			} )
			.finally( () => { setLoading( false ) } );

	}, [ category, invalidCategory ] );

	if ( invalidCategory ) return <ScreenMessage type="error" message="Oops! That's not part of our menu." />;
	if ( loading ) return <ScreenMessage type="loading" />;
	if ( !products.length ) return <ScreenMessage type="error" message="Oops! Nothing on the menu here." />;

	return (
		<>
			<h2 className="tab-title">
				{ category ? capitalize( category ) : "All Products" }
			</h2>
			<ItemList products={ products } />
		</>
	);
};