export const formatPrice = ( number ) => {
	const pricing = `$ ${ number.toFixed( 2 ) }`;
	return pricing;
};