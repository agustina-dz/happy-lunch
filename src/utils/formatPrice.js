export const formatPrice = ( number ) => {
	const pricing = `$ ${ Number( number ).toFixed( 2 ) }`;
	return pricing;
};