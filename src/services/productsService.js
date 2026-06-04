import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	doc,
	query,
	where
} from "firebase/firestore";

import { db } from "../firebase/config";

const productsRef = collection( db, "products" );

// ----- traer productos por categoría ----- //
export const getByCategory = async ( category ) => {
	try {
		const queryRef = category
			? query( productsRef, where( "category", "==", category ) )
			: productsRef;

		const snapshot = await getDocs( queryRef );

		const productsFormat = snapshot.docs.map( ( doc ) => {
			return { id: doc.id, ...doc.data() };
		} );

		return productsFormat;

	} catch ( error ) {
		console.error( "Error fetching products by category:", error );
		return [];
	};
};

// ----- traer producto por ID ----- //
export const getProductById = async ( id ) => {
	try {
		const productRef = doc( db, "products", id );

		const snapshot = await getDoc( productRef );

		if ( snapshot.exists() ) {
			const product = { id: snapshot.id, ...snapshot.data() };
			return product;
		} else {
			return null;
		};

	} catch( error ) {
		console.error( "Error fetching product by ID:", error );
		return null;
	};
};

// ----- JSON local: traer productos por categoría ----- //
// Firebase es temporal, al finalizar el curso se reemplazará el fetch de Firebase por el de JSON local
export const getLocalByCategory = async ( category ) => {
	try {
		const response = await fetch( "/data/products.json" );
		const contentType = response.headers.get( "content-type" );

		if ( !response.ok || !contentType.includes( "application/json" ) ) {
			throw new Error( "Unable to retrieve JSON data." );
		};

		const data = await response.json();
		return category ? data.filter( product => product.category === category ) : data;

	} catch ( fetchError ) {
		console.error( "Error fetching products by category:", fetchError );
		return [];
	};
};

// ----- JSON local: traer producto por ID ----- //
export const getLocalProductById = async ( id ) => {
	try {
		const response = await fetch( "/data/products.json" );
		const contentType = response.headers.get( "content-type" );

		if ( !response.ok || !contentType.includes( "application/json" ) ) {
			throw new Error( "Unable to retrieve JSON data." );
		};

		const data = await response.json();
		return data.find( product => product.id === id ) ?? null;

	} catch ( fetchError ) {
		console.error( "Error fetching product by ID:", fetchError );
		return null;
	};
};