import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const loginData = { email: "", password: "" };

const FormSection = ({ children }) => {
	return <div className="form-section">{ children }</div>;
};
const FormInput = ({ children }) => {
	return <div className="form-input">{ children }</div>;
};

export const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [ formData, setFormData ] = useState( loginData );

	const handleChange = ( event ) => {
		const { name, value } = event.target;
		setFormData( { ...formData, [ name ]: value } );
	};

	const handleSubmit = async ( event ) => {
		event.preventDefault();

		try {
			await login( formData.email, formData.password );
			navigate( "/admin", { replace: true } );

		} catch ( error ) {
			console.error( "Login error:", error );
			alert( "Login failed. Please try again." );
		};
	};

	return (
		<form className="login-form" onSubmit={ handleSubmit }>
			<h2>Login</h2>

			<FormSection>
				<FormInput>
					<label className="required">Email</label>
					<input
						type="email"
						name="email"
						placeholder="admin@admin.com"
						value={ formData.email }
						onChange={ handleChange }
						required
					/>
				</FormInput>
			</FormSection>

			<FormSection>
				<FormInput>
					<label className="required">Password</label>
					<input
						type="password"
						name="password"
						placeholder="∗∗∗∗∗∗∗∗∗∗∗∗"
						value={ formData.password }
						onChange={ handleChange }
						required
					/>
				</FormInput>
			</FormSection>

			<button className="form-button" type="submit">
				Login
			</button>
		</form>
	)
};