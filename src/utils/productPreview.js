const placeholder = {
	id: "example",
	name: "Example",
	description: "Lorem ipsum dolor",
	ingredients: [ "Ingredient 1", "Ingredient 2", "Ingredient 3" ],
	allergens: [ "Allergen 1", "Allergen 2", "Allergen 3" ],
	category: "mains",
	price: 1,
	order_limit: 5,
	image: "https://i.ibb.co/dsLh13vT/burger.png",
	emoji: "🛒"
};

const fallback = ( value, placeholder ) => {
	if ( Array.isArray( value ) ) {
		return value.length ? value : placeholder;
	};

	return value === "" || value == null ? placeholder : value;
};

const parseList = ( value ) => (
	typeof value === "string" ? value.split( "\n" ).filter( Boolean ) : value
);

export const productPreview = ( product ) => {
	const parsedIngredients = parseList( product.ingredients );
	const formFilled = parsedIngredients.length > 0;

	return {
		id: fallback( product.id, placeholder.id ),
		name: fallback( product.name, placeholder.name ),
		description: fallback( product.description, placeholder.description ),
		ingredients: fallback( parsedIngredients, placeholder.ingredients ),
		allergens: formFilled ? parseList( product.allergens ) : placeholder.allergens,
		category: fallback( product.category, placeholder.category ),
		price: Number( fallback( product.price, placeholder.price ) ),
		order_limit: Number( fallback( product.order_limit, placeholder.order_limit ) ),
		image: fallback( product.image, placeholder.image ),
		emoji: fallback( product.emoji, placeholder.emoji )
	};
};