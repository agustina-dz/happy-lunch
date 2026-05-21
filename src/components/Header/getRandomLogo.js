const LOGO_IMAGES = [ "burger", "pizza", "donut" ];

export const getRandomLogo = () => {
	const randomIndex = Math.floor( Math.random() * LOGO_IMAGES.length );
	return LOGO_IMAGES[ randomIndex ];
};