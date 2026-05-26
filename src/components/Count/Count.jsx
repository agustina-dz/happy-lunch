import "./Count.css"

export const Count = ({ onIncrement, onDecrement, value = 0 }) => {
	return (
		<div className="counter-container">
			<button className="counter" onClick={ onDecrement } disabled={ value === 0 }>-</button>

			<p className="counter-number text-numerical">{ value }</p>

			<button className="counter" onClick={ onIncrement }>+</button>
		</div>
	);
};