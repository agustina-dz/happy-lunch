import { productPreview } from "../../utils/productPreview";
import { productSuggestions } from "../../utils/productSuggestions";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import "./ProductFormUI.css";

const FormSection = ({ children }) => {
	return <div className="form-section">{ children }</div>;
};
const FormInput = ({ children }) => {
	return <div className="form-input">{ children }</div>;
};

export const ProductFormUI = ({
	product,
	errors,
	loading,
	isEditMode,
	onChange,
	onFileChange,
    onSuggest,
	onSubmit
}) => {

	const ErrorMessage = ( error ) => {
		return error ? <p className="form-error">{ error }</p> : null;
	};

	return (
		<>
			<section className="form-container">

				<form className="product-form" onSubmit={ onSubmit } noValidate>
					<h2 className="tab-title">
						{ isEditMode ? "Edit" : "New" } Product
					</h2>

					{ !isEditMode && (
						<section className="product-suggestions">

							<h3>Quick fill</h3>
							<small className="hint">Click a preset to auto-fill the form</small>

							<div className="suggestions-list">
								{ productSuggestions.map( ( suggestion ) => (
									<div key={ suggestion.id } className="suggestion">
										<img src={ suggestion.image } width="32" height="32" alt={ suggestion.name } />
										<button type="button" onClick={ () => onSuggest( suggestion ) }>
											{ suggestion.name }
										</button>
									</div>
								) ) }
							</div>
						</section>
					) }

					<FormSection>
						<FormInput>
							<label className="required">Name</label>
							<input
								type="text"
								name="name"
								value={ product.name }
								onChange={ onChange }
								required
							/>
						</FormInput>

						<FormInput>
							<label className="required">ID</label>
							<input
								type="text"
								name="id"
								value={ product.id }
								onChange={ onChange }
								readOnly={ isEditMode } // evita modificar el ID en modo edición
								required
							/>
						</FormInput>

						{ ErrorMessage( errors.name ) }
						{ ErrorMessage( errors.id ) }
					</FormSection>

					<FormSection>
						<FormInput>
							<label className="required">Image</label>
							<input
								type="file"
								name="image"
								onChange={ onFileChange }
								required={ !isEditMode }
							/>
						</FormInput>

						<FormInput>
							<label>Emoji</label>
							<input
								type="text"
								name="emoji"
								value={ product.emoji }
								onChange={ onChange }
							/>
						</FormInput>

						{ ErrorMessage( errors.image ) }
						{ isEditMode && <p className="form-message">Leave empty to keep current image.</p> }
					</FormSection>

					<FormSection>
						<FormInput>
							<label className="required">Description</label>
							<textarea
								name="description"
								value={ product.description }
								maxLength={ 30 }
								onChange={ onChange }
								required
							/>
							<small>{ product.description.length }/30 characters</small>
							{ ErrorMessage( errors.description ) }
						</FormInput>

					</FormSection>

					<FormSection>
						<FormInput>
							<label className="required">Category</label>
							<select
								name="category"
								value={ product.category }
								onChange={ onChange }
								required
							>
								<option value="" disabled>Select category</option>
								<option value="mains">Mains</option>
								<option value="drinks">Drinks</option>
								<option value="bakery">Bakery</option>
								<option value="desserts">Desserts</option>
							</select>
							{ ErrorMessage( errors.category ) }
						</FormInput>
					</FormSection>

					<FormSection>
						<FormInput>
							<label className="required">Price per Unit</label>
							<div className="pricing-wrapper">
								<span>$</span>
								<input
									type="number"
									name="price"
									value={ product.price }
									onChange={ onChange }
									required
								/>
							</div>
						</FormInput>

						<FormInput>
							<label className="required">Order Limit</label>
							<input
								type="number"
								name="order_limit"
								value={ product.order_limit }
								onChange={ onChange }
								required
							/>
						</FormInput>

						{ ErrorMessage( errors.price ) }
						{ ErrorMessage( errors.order_limit ) }
					</FormSection>

					<FormSection>
						<FormInput>
							<label className="required">Ingredients</label>
							<textarea
								name="ingredients"
								value={ product.ingredients }
								onChange={ onChange }
								required
							/>
							<small>One ingredient per line</small>
							{ ErrorMessage( errors.ingredients ) }
						</FormInput>
					</FormSection>

					<FormSection>
						<FormInput>
							<label>Allergens</label>
							<textarea
								name="allergens"
								value={ product.allergens }
								onChange={ onChange }
							/>
							<small>One allergen per line</small>
						</FormInput>
					</FormSection>

					<button className="form-button" type="submit" disabled={ loading }>
						{ loading ? "Saving..." : "Submit Product" }
					</button>

					{ ErrorMessage( errors.general ) }

				</form>

				<div className="product-preview">
					<h2 className="tab-title">Product Preview</h2>
					<ItemDetail item={ productPreview( product ) } preview={ true } />
				</div>
			</section>
		</>
	);
};