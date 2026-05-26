import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "../../utils/capitalize";
import { ItemList } from "../ItemList/ItemList";
import { ScreenMessage } from "../ScreenMessage/ScreenMessage";

export const ItemListContainer = () => {
	const { category } = useParams();

	const [ products, setProducts ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( false );

	useEffect( () => {
		fetch( "/data/products.json" )
			.then( ( response ) => {
				const contentType = response.headers.get( "content-type" );
				if ( !response.ok || !contentType.includes( "application/json" ) ) {
					throw new Error( "Unable to retrieve JSON data." )
				};
				return response.json();
			})
			.then( ( data ) => setProducts( data ) )
			.catch( ( fetchError ) => {
				console.log( fetchError );
				setError( true );
			} )
			.finally( () => { setLoading( false ) } );

	}, [] );

	// filtrar productos por categoría
	const filteredProducts = ( category )
		? products.filter( ( product ) => product.category === category )
		: products;

	if ( loading ) return <ScreenMessage type="loading" />;

	if ( error ) return <ScreenMessage type="error" />;

	const isUnknownCategory = category && !products.some( p => p.category === category );
	if ( isUnknownCategory ) return <ScreenMessage type="error" message="Oops! That's not part of our menu." />;

	if ( !filteredProducts.length ) return <ScreenMessage type="error" message="Oops! Nothing on the menu here." />;

	return (
		<>
			<h2 className="tab-title">
				{ category ? capitalize( category ) : "All Products" }
			</h2>
			<ItemList products={ filteredProducts } />
		</>
	);
};