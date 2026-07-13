import {
	collection,
	setDoc, // actualizar o crear un documento con ID específico
	getDoc,
	getDocs,
	deleteDoc,
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
			return { ...doc.data(), id: doc.id };
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

// ----- alta de producto con ID personalizado ----- //
export const createProduct = async ( productData ) => {
	try {
		// separar el id del resto de los datos
		const { id, ...data } = productData;

		// impedir acción si ya existe un producto con el mismo ID (evita sobreescribir un producto existente)
		const productRef = doc( db, "products", id );
		const existingDoc = await getDoc( productRef );

		if ( existingDoc.exists() ) {
			throw new Error( `Product with ID "${ id }" already exists.` );
		};
		// ----- ----- ----- ----- -----

		await setDoc( productRef, data );
		return id;

	} catch ( error ) {
		console.error( "Error creating product:", error );
		throw error;
	};
};

// ----- edición de producto ----- //
export const updateProduct = async ( productData ) => {
	try {
		const { id, ...data } = productData;
		const productRef = doc( db, "products", id );

		await setDoc( productRef, data );
		return id;

	} catch ( error ) {
		console.error( "Error updating product:", error );
		throw error;
	};
};

// ----- eliminar producto ----- //
export const deleteProduct = async ( id ) => {
	try {
		const productRef = doc( db, "products", id );
		await deleteDoc( productRef );
		return id;

	} catch ( error ) {
		console.error( "Error deleting product:", error );
		throw error;
	};
};


// ----- ----- ----- ----- ----- ----- ----- ----- ----- //
// ----- ----- ----- ----- ----- ----- ----- ----- ----- //


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