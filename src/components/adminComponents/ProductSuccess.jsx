import { useParams, useLocation, Navigate, useNavigate } from "react-router-dom";
import "./ProductSuccess.css";

const actionMessages = {
	created: { icon: "✅", verb: "created" },
	updated: { icon: "✏️", verb: "updated" },
	deleted: { icon: "🗑️", verb: "removed" }
};

export const ProductSuccess = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	// proteger ruta para que solo se pueda acceder desde el formulario
	if ( !location.state?.fromForm ) {
		return <Navigate to="/" replace />;
	};

	const action = location.state.action ?? "created";
	const { icon, verb } = actionMessages[ action ] ?? actionMessages.created;
	const category = location.state.category;

	return (
		<section className="form-success">
			<h2 className="tab-title">{ icon } Product { verb } successfully!</h2>

			<p>Product ID: <b>{ id }</b></p>

			<div className="success-actions">
				{ action !== "deleted" && (
					<button type="button" onClick={ () => navigate( `/${ category }/${ id }` ) } className="dashboard-button">
						<img src="/img/assets/admin/Document.png" width="16" height="16" alt="Edit" />
						<span>Go to product page</span>
					</button>
				) }

				<button type="button" onClick={ () => navigate( `/admin` ) } className="dashboard-button">
					<img src="/img/assets/admin/Restart.png" width="16" height="16" alt="Edit" />
					<span>Back to Dashboard</span>
				</button>
			</div>

		</section>
	);
};