import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { ScreenMessage } from "../ScreenMessage/ScreenMessage";

export const ItemDetailContainer = () => {
	const { id } = useParams();

	const [ itemDetail, setItemDetail ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( false );

	useEffect( () => {
		fetch( "/data/products.json")
			.then( response => response.json() )
			.then( data => {
				const item = data.find( product => product.id === id );
				if ( item ) {
					setItemDetail( item );
					return;
				};
				throw new Error( "Item not found", { cause: "missingProduct" } );
			})
			.catch( fetchError => {
				console.log( fetchError );
				if ( fetchError.cause === "missingProduct" ) return;
				setError( true );
			} )
			.finally( () => setLoading( false ) )
	}, [] );

	if ( loading ) return <ScreenMessage type="loading" />;

// ----- mensajes de error ----- //

	// error al cargar el JSON
	if ( error ) return <ScreenMessage type="error" />;

	// producto no encontrado
	if ( !itemDetail ) return <ScreenMessage type="error" message="Oops! That item isn't on the menu." />;


	return (
		<ItemDetail item={ itemDetail } />
	);
};