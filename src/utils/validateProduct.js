export const validateProduct = ( product ) => {
	const errors = {};

	// id
	if ( !product.id.trim() ) {
		errors.id = "ID is required.";

	} else if ( !/^[a-z0-9-]+$/.test( product.id ) ) {
		errors.id = "ID can only contain lowercase letters (a-z), numbers (0-9), and dashes (-)."
	};

	// name
	if ( !product.name.trim() ) {
		errors.name = "Name is required.";
	};

	// description
	if ( !product.description.trim() ) {
		errors.description = "Description is required.";

	} else if ( product.description.length > 30 ) {
		errors.description = "Description must be 30 characters or fewer.";
	};

	// ingredients
	if ( !product.ingredients.length ) {
		errors.ingredients = "At least one ingredient is required.";
	};

	// category
	if ( !product.category.trim() ) {
		errors.category = "Category is required.";
	};

	// price
	if ( !product.price ) {
		errors.price = "Price is required.";

	} else if ( product.price <= 0 ) {
		errors.price = "Price must be greater than zero.";
	};

	// order_limit
	if ( !product.order_limit ) {
		errors.order_limit = "Order limit is required."

	} else if ( product.order_limit <= 0 ) {
		errors.order_limit = "Order limit must be greater than zero."
	};

	// file ( image )
	if ( !product.file && !product.image ) {
		errors.image = "Image is required.";
	};

	return errors;
};