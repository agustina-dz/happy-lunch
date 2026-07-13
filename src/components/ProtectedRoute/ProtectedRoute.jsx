import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ScreenMessage } from "../ScreenMessage/ScreenMessage.jsx";

export const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if ( loading ) return <ScreenMessage type="loading" />

	if ( !user ) return <Navigate to="/login" />

	return children;
};