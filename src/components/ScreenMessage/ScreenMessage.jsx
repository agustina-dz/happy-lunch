import { useState, useEffect } from "react";
import { Message } from "./Message";

// ----- tipos de mensajes y sus "configuraciones" ----- //
const MESSAGE_TYPES = {
	error: {
		image: "error",
		message: "Oops! Something went wrong.\nPlease try again later.",
		homeLink: true
	},
	loading: {
		image: "loading",
		message: "Loading... Please wait.",
		homeLink: false
	},
	emptyCart: {
		image: "cart-empty",
		message: "Oh... Looks like your cart is empty.",
		homeLink: true
	}
};

export const ScreenMessage = ({ type = "error", message }) => {

	// obtener tipo de mensaje
	const messageType = MESSAGE_TYPES[ type ];


// ----- loading: retrasar la visibilidad del mensaje para evitar el parpadeo en cargas rápidas ----- //

	// verificar si el mensaje es "loading"
	const isLoading = type === "loading";

	// estado que controla la visibilidad ( si el mensaje es "loading", inicia como false para retrasar su aparición y evitar el parpadeo )
	const [ isVisible, setIsVisible ] = useState( isLoading ? false : true );

	// efecto para retrasar la visibilidad
	useEffect( () => {

		// si el mensaje no es "loading", mostrarlo sin delay
		if ( !isLoading ) {
			setIsVisible( true );
			return;
		};

		// configurar timer para mostrar el mensaje después de un delay
		const timer = setTimeout( () => setIsVisible( true ), 300 );

		// limpiar el timer al desmontar el componente
		return () => clearTimeout( timer );

	}, [ isLoading ] ); // el efecto se ejecuta al montar el componente ( isLoading no cambia durante el ciclo de vida del componente )


// ----- early returns ----- //

	// si el tipo de mensaje no es válido, no renderizar nada
	if ( !messageType ) return null;

	// si el mensaje es "loading" y no es visible todavía, no renderizar nada
	if ( !isVisible ) return null;

	return (
		<Message
			image={ messageType.image }
			message={ message ? message : messageType.message }
			homeLink={ messageType.homeLink }
		/>
	);
};