import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productsService";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { ScreenMessage } from "../ScreenMessage/ScreenMessage";

export const ItemDetailContainer = () => {
	const { id } = useParams();

	const [ itemDetail, setItemDetail ] = useState( null );
	const [ loading, setLoading ] = useState( true );

	useEffect( () => {
		setLoading( true );

		getProductById( id )
			.then( ( data ) => setItemDetail( data ))
			.catch( ( fetchError ) => console.log( fetchError ) )
			.finally( () => setLoading( false ) );

	}, [ id ] );

	if ( loading ) return <ScreenMessage type="loading" />;
	if ( !itemDetail ) return <ScreenMessage type="error" message="Oops! That item isn't on the menu." />;

	return (
		<ItemDetail item={ itemDetail } />
	);
};