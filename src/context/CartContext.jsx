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


	// ----- obtener item quantity ----- //
	const getItemQuantity = ( id ) => {
		const itemQuantity = cart.find( element => element.id === id )?.quantity ?? 0;
		return itemQuantity;
	};

	// ----- actualizar item quantity ----- //
	const updateItemQuantity = ( item, updatedQuantity ) => {
		const itemQuantity = getItemQuantity( item.id );

		// agregar item al carrito si el nuevo quantity es >= 1 y el item no existe en el carrito
		if ( itemQuantity === 0 && updatedQuantity >= 1 ) {
			setCart([ ...cart, { ...item, quantity: updatedQuantity } ]);
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

	// ----- agregar item al carrito (quantity) ----- //
	const addItem = ( item, quantity = 1 ) => {
		if ( quantity === 0 ) return;

		const itemQuantity = getItemQuantity( item.id );
		const newQuantity = itemQuantity + quantity;

		// impedir acción si new quantity supera el límite de compra (early return)
		if ( newQuantity > item.order_limit ) {
			alert(`You can only add up to ${ item.order_limit } ${ item.name }(s) to your cart.`);
			return;
		};

		updateItemQuantity( item, newQuantity );

		const message = `${ item.name }${ newQuantity > 1 ? "(s)" : "" } added to your cart.`+
			`${ ( newQuantity > 1 ) ? `\n\n${ item.emoji ?? "🛒" } ${ item.name }(s) in cart: ${ newQuantity }` : "" }`;
		alert( message );
	};

	// ----- eliminar item del carrito (quantity) ----- //
	const removeItem = ( item, quantity = 1 ) => {
		if ( quantity === 0 ) return;

		const itemQuantity = getItemQuantity( item.id );
		const newQuantity = itemQuantity - quantity;

		if ( itemQuantity === 0 ) return;

		updateItemQuantity( item, newQuantity );

		const message = `${ item.name } removed from your cart.`+
			`${ ( newQuantity >= 1 ) ? `\n\n${ item.emoji ?? "🛒" } ${ item.name }(s) in cart: ${ newQuantity }` : "" }`;
		alert( message );
	};

	// ----- eliminar item del carrito ----- //
	const deleteItem = ( item ) => {
		const itemQuantity = getItemQuantity( item.id );
		if ( itemQuantity === 0 ) return;

		updateItemQuantity( item, 0 );

		const message = `${ item.name }${ itemQuantity > 1 ? "(s)" : "" } removed from your cart.`;
		alert( message );
	};

	// ----- obtener número total de items en el carrito (quantity) ----- //
	const getTotalItems = () => {
		return cart.reduce( ( acc, element ) => acc + element.quantity, 0 );
	};

	// ----- obtener valor total de items en el carrito (quantity) ----- //
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