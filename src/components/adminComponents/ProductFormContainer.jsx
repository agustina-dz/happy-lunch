import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateProduct } from "../../utils/validateProduct";
import { createProduct, updateProduct, getProductById } from "../../services/productsService";
import { uploadImage } from "../../services/uploadImage";
import { ProductFormUI } from "./ProductFormUI";

const productObject = {
		id: "",
		name: "",
		description: "",
		ingredients: "",
		allergens: "",
		category: "",
		price: "",
		order_limit: "",
		image: "",
		emoji: ""
	};

export const ProductFormContainer = () => {
	const { id: editId } = useParams();
	const isEditMode = Boolean( editId );

	const navigate = useNavigate();

	const [ loading, setLoading ] = useState( false );
	const [ errors, setErrors ] = useState( {} );
	const [ file, setFile ] = useState( null );
	const [ product, setProduct ] = useState( productObject );

	// cargar el producto existente en modo edit
	useEffect( () => {
		if ( !isEditMode ) return;

		setLoading( true );
		getProductById( editId )
			.then( ( data ) => {
				if ( !data ) {
					setErrors( { general: "Product not found." } );
					return;
				};
				setProduct( {
					...data,
					// convertir arrays a strings para los textareas
					ingredients: ( data.ingredients ?? [] ).join( "\n" ),
					allergens: ( data.allergens ?? [] ).join( "\n" )
				} );
			})
			.catch( () => setErrors( { general: "Failed to load product." } ) )
			.finally( () => setLoading( false ) );
	}, [ editId, isEditMode ] );

	const handleChange = ( event ) => {
		const { name, value } = event.target;
		setProduct( { ...product, [ name ]: value } );
	};

	const handleFileChange = ( event ) => {
		const file = event.target.files[ 0 ] || null;
		setFile( file );

		// actualizar la vista previa de la imagen en el formulario
		if ( file ) {
			setProduct( prev => ({
				...prev,
				image: URL.createObjectURL( file )
			}) )
		};
	};

	// ----- rellenar formulario con sugerencia ----- //
	const handleSuggest = ( suggestion ) => {
		setProduct( {
			...suggestion,

			// convertir arrays a strings para los textareas
			ingredients: suggestion.ingredients.join( "\n" ),
			allergens:   suggestion.allergens.join( "\n" ),

			// convertir números a strings para los inputs numéricos
			price:       String( suggestion.price ),
			order_limit: String( suggestion.order_limit )
		} );

		// reset del file porque la sugerencia usa una URL estática
		setFile( null );
		setErrors( {} );
	};

	const handleSubmit = async ( event ) => {
		event.preventDefault();

		// resetear estados para el nuevo intento del envío del formulario
		setErrors( {} );
		setLoading( true );

		// validar producto
		const newErrors = validateProduct( { ...product, file } );
		if ( Object.keys( newErrors ).length > 0 ) {
			setErrors( newErrors );
			setLoading( false );
			return;
		};

		try {
			// subir imagen a ImgBB y obtener URL ( únicamente si el usuario seleccionó un archivo )
			const imageUrl = file ? await uploadImage( file ) : product.image;

			// actualizar producto
			const productData = {
				...product,
				ingredients: product.ingredients
					.split( "\n" )
					.map( string => string.trim() )
					.filter( Boolean ),

				allergens: product.allergens
					.split( "\n" )
					.map( string => string.trim() )
					.filter( Boolean ),

				price: Number( product.price ),
				order_limit: Number( product.order_limit ),
				image: imageUrl,
			};

			// enviar producto a Firebase
			const id = isEditMode ? await updateProduct( productData ) : await createProduct( productData );

			// vaciar formulario
			setProduct( productObject );
			setFile( null );

			// navegar a pantalla de éxito
			// replace: true -> reemplaza la URL actual en el historial para evitar volver al formulario con datos cargados al hacer clic en el botón "back" del navegador
			navigate( `/admin/products/success/${ id }`, {
				replace: true,
				state: {
					fromForm: true, // proteger ruta para que solo se pueda acceder desde el formulario
					category: product.category,
					action: isEditMode ? "updated" : "created"
				}
			} );

		} catch ( error ) {
			setErrors( { general: error.message } );

		} finally {
			setLoading( false );
		};
	};

	return (
		<ProductFormUI
			product={ product }
			errors={ errors }
			loading={ loading }
			isEditMode={ isEditMode }
			onChange={ handleChange }
			onFileChange={ handleFileChange }
			onSuggest={ handleSuggest }
			onSubmit={ handleSubmit }
		/>
	);
};