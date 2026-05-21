import { IngredientsList } from "../IngredientsList/IngredientsList";

export const IngredientsListContainer = ({ ingredients, allergens }) => {
	return (
		<div className="ingredients-container">

			<IngredientsList title="Ingredients" list={ ingredients } />

			{ allergens.length
				? <IngredientsList title="Allergens" list={ allergens } />
				: null }

		</div>
	);
};