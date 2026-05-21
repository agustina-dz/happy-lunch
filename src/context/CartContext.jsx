import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// CONTEXT
const CartContext = createContext();

// HOOK
export const useCart = () => {
	const context = useContext( CartContext );

	if ( !context ) {
		throw new Error("useCart should be used in a CartProvider");
	};

	return context;
};

// PROVIDER
export const CartProvider = ({ children }) => {

	const navigate = useNavigate();
	const [ cart, setCart ] = useState([]);


// ----- ----- ----- obtener item quantity ----- ----- ----- //
	const getItemQuantity = ( id ) => {

		// si el item no está presente en el carrito, return quantity -> 0
		const itemQuantity = cart.find( element => element.id === id )?.quantity ?? 0;

		return itemQuantity;
	};

// ----- ----- ----- actualizar item quantity ----- ----- ----- //
	const updateItemQuantity = ( item, updatedQuantity ) => {

		// obtener item quantity
		const itemQuantity = getItemQuantity( item.id );

		// agregar item al carrito si el nuevo quantity es 1 y el item no existe en el carrito
		if ( itemQuantity === 0 && updatedQuantity === 1 ) {
			setCart([ ...cart, { ...item, quantity: 1 } ]);
			return;
		};

		// eliminar item del carrito si el nuevo quantity es 0
		if ( updatedQuantity === 0 ) {
			setCart( cart.filter( element => element.id !== item.id ) );
			return;
		};

		// actualizar item quantity ( item no se agrega/elimina del carrito )
		const updatedCart = cart.map( element => (
			element.id === item.id ? { ...element, quantity: updatedQuantity } : element
		));
		setCart( updatedCart );
	};

// ----- ----- ----- agregar item al carrito (quantity) ----- ----- ----- //
	const addItem = ( item ) => {

		// obtener item quantity y new quantity
		const itemQuantity = getItemQuantity( item.id );
		const newQuantity = itemQuantity + 1;

		// impedir acción si new quantity supera el límite de compra (early return)
		if ( newQuantity > item.order_limit ) {
			alert(`Cannot add any more ${ item.name } to your cart.`);
			return;
		};

		// actualizar item quantity en el carrito
		updateItemQuantity( item, newQuantity );

		// informar al usuario (alert)
		const message =  `${ item.name } added to your cart.`+
			`${ ( newQuantity > 1 ) ? `\n\n${ item.emoji ?? "🛒" } ${ item.name }(s) in cart: ${ newQuantity }` : "" }`;
		alert( message );
	};

// ----- ----- ----- eliminar item del carrito (quantity) ----- ----- ----- //
	const removeItem = ( item ) => {

		// obtener item quantity y new quantity
		const itemQuantity = getItemQuantity( item.id );
		const newQuantity = itemQuantity - 1;

		// impedir acción si item no se encuentra en el carrito (early return)
		if ( itemQuantity === 0 ) return;

		// actualizar item quantity en el carrito
		updateItemQuantity( item, newQuantity );

		// informar al usuario (alert)
		const message =  `${ item.name } removed from your cart.`+
			`${ ( newQuantity >= 1 ) ? `\n\n${ item.emoji ?? "🛒" } ${ item.name }(s) in cart: ${ newQuantity }` : "" }`;
		alert( message );
	};

// ----- ----- ----- eliminar item del carrito ----- ----- ----- //
	const deleteItem = ( item ) => {

		// impedir acción si item no se encuentra en el carrito (early return)
		const itemQuantity = getItemQuantity( item.id );
		if ( itemQuantity === 0 ) return;

		// eliminar item del carrito
		updateItemQuantity( item, 0 );

		// informar al usuario (alert)
		const message =  `${ item.name }${ itemQuantity > 1 ? "(s)" : "" } removed from your cart.`;
		alert( message );
	};

// ----- ----- ----- obtener número total de items en el carrito (quantity) ----- ----- ----- //
	const getTotalItems = () => {
		return cart.reduce( ( acc, element ) => acc + element.quantity, 0 );
	};

// ----- ----- ----- obtener número total de items en el carrito (quantity) ----- ----- ----- //
	const getCartTotal = () => {
		return cart.reduce( ( acc, element ) => acc + element.price * element.quantity, 0 );
	};


	const clearCart = () => {
		setCart([]);
	};

	const checkout = () => {
		alert(`🛒 Order placed successfully!`);
		clearCart();
		navigate("/");
	};

	return (
		<CartContext.Provider value={{
			cart,
			getItemQuantity,
			addItem,
			removeItem,
			deleteItem,
			clearCart,
			getTotalItems,
			getCartTotal,
			checkout
		}}>
			{ children }
		</CartContext.Provider>
	);
};