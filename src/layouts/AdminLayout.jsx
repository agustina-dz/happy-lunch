import { Outlet } from "react-router-dom";
import { Header } from "../components/adminComponents/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const AdminLayout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};