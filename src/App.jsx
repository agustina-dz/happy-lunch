import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {

	// cargar imagen "loading" en el caché para evitar mensaje "loading" sin imagen
	useEffect( () => {
		new Image().src = "/img/assets/screen/loading.png";
	}, [] );

	return (
		<>
			<Routes>
				<Route element={ <PublicLayout /> }>
					<Route path="/" element={ <ItemListContainer /> } />

					<Route path="/:category" element={ <ItemListContainer /> } />
					<Route path="/:category/:id" element={ <ItemDetailContainer /> } />

					<Route path="/cart" element={ <CartView /> } />
				</Route>

				<Route path="/login" element={ <Login /> } />
				<Route path="/admin" element={ <ProtectedRoute><AdminLayout /></ProtectedRoute> }>
					<Route index element={ <Navigate to="dashboard" /> } />
					<Route path="dashboard" element={ <Dashboard /> } />

					<Route path="products/new" element={ <ProductFormContainer /> } />
					<Route path="products/edit/:id" element={ <ProductFormContainer /> } />
					<Route path="products/success/:id" element={ <ProductSuccess /> } />
				</Route>
			</Routes>
		</>
	);
};

export default App;
