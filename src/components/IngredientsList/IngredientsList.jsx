import "./IngredientsList.css"

export const IngredientsList = ({ title, list }) => {
	return (
		<div className="ingredients-list">
			<h4>{ title }</h4>

			{ /* si la lista tiene más de 4 items, usar columnas */ }
			<ul className={ list.length > 4 ? "columns" : "" }>

				{ list.map( item => <li key={ item }>{ item }</li> ) }

			</ul>
		</div>
	);
};