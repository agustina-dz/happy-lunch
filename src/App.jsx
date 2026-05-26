import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import "./App.css";

function App() {

	// cargar imagen de "loading" en el caché para evitar mensaje "loading" sin imagen
	useEffect( () => {
		new Image().src = "/img/assets/screen/loading.png";
	}, [] );

	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={ <ItemListContainer /> } />
					<Route path="/:category" element={ <ItemListContainer /> } />
					<Route path="/:category/:id" element={ <ItemDetailContainer /> } />
					<Route path="/cart" element={ <CartView /> } />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;
