import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditItemForm.scss";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import apiInstance from "../../utils/ApiClient";
import FormErrorNotification from "../FormErrorNotification/FormErrorNotification";

const EditForm = ({ itemObject, warehousesProps, requestMethod }) => {
  const navigate = useNavigate();
  const {
    id,
    warehouse_name,
    item_name,
    description,
    category,
    status,
    quantity,
  } = itemObject;
  const { warehousesArray } = warehousesProps;
  const warehouses = warehousesArray.map((object) => object.warehouse_name);

  const [formData, setFormData] = useState({
    warehouse_name: warehouse_name,
    item_name: item_name,
    description: description,
    category: category,
    status: status || "In Stock",
    quantity: quantity || 0,
  });
  const [errorState, setErrorState] = useState({
    warehouse_name: null,
    item_name: null,
    description: null,
    category: null,
    status: null,
    quantity: null,
  });

  const categories = [
    "Electronics",
    "Apparel",
    "Accessories",
    "Health",
    "Gear",
  ];
  const errorClassName = "error";

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorState({
      ...errorState,
      [name]: null,
    });
  };

  const validateForm = async (enteredQuantity) => {
    let errors = {};
    const quantityErrorState =
      enteredQuantity < 0 || typeof enteredQuantity !== "number";
    const warehouseId =
      warehousesArray.find(
        (warehouseObject) =>
          warehouseObject.warehouse_name === formData.warehouse_name
      )?.id || null;
    errors = {
      warehouse_name: !warehouseId,
      item_name: formData.item_name?.length < 3 || !formData.item_name,
      description: formData.description?.length < 3 || !formData.description,
      category: !formData.category,
      quantity: quantityErrorState,
    };
    setErrorState(errors);
    const propertiesWithErrors = Object.keys(errors).filter((key) => {
      return errors[key] == true;
    });
    const isValid = !Object.values(errors).includes(true);
    if (!isValid) {
      alert(
        `Invalid input for ${propertiesWithErrors.join(
          ", "
        )}. \n\nQuantity must be non-negative. Text values have 3+ characters. Drop-down selections cannot be blank.`
      );
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // If status is set to "Out of Stock", quantity is transformed to 0.
    let enteredQuantity = formData.quantity;
    enteredQuantity = parseInt(enteredQuantity);
    if (formData.status === "Out of Stock") {
      enteredQuantity = 0;
      formData.quantity = 0;
    }
    const validFormSubmission = await validateForm(enteredQuantity);
    if (validFormSubmission) {
      const { warehouse_name, ...submittedItem } = formData;
      const warehouseId =
        warehousesArray.find(
          (warehouseObject) =>
            warehouseObject.warehouse_name === formData.warehouse_name
        )?.id || null;
      submittedItem.warehouse_id = warehouseId;
      submittedItem.quantity = enteredQuantity;

      let responseData;
      if (requestMethod === "put") {
        responseData = await apiInstance.put("inventories", id, submittedItem);
      } else {
        responseData = await apiInstance.post("inventories", submittedItem);
      }
      if (typeof responseData === "object") {
        alert(
          `${formData.item_name} successfully ${
            requestMethod === "put" ? "edited" : "added"
          }`
        );
        navigate(-1);
      } else {
        const message = `Failed to ${
          requestMethod === "put" ? "edit" : "add"
        }: ${responseData}`;
        alert(message);
      }
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setFormData({
      ...formData,
      status: newStatus,
    });
  };
  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inventory-form__container">
          <section className="inventory-form__divider inventory-form__divider--left">
            <h2>Item Details</h2>
            <div className="inventory-form__divider-detail">
              <label htmlFor="item_name" className="label-text">
                Item Name{" "}
              </label>
              <input
                className={
                  errorState.item_name
                    ? `form-input ${errorClassName}`
                    : "form-input"
                }
                type="text"
                id="item_name"
                name="item_name"
                defaultValue={formData.item_name}
                placeholder="item name"
                onChange={handleChange}
              />
              <FormErrorNotification inError={errorState.item_name} />
            </div>
            <div className="inventory-form__divider-detail">
              <label htmlFor="description" className="label-text">
                Description{" "}
              </label>
              <textarea
                className={
                  errorState.description
                    ? `form-input form-input--description ${errorClassName}`
                    : "form-input form-input--description"
                }
                id="description"
                name="description"
                defaultValue={formData.description}
                placeholder="Please enter a brief item description..."
                onChange={handleChange}
              />
              <FormErrorNotification inError={errorState.description} />
            </div>
            <div className="inventory-form__divider-detail inventory-form__divider-detail--last">
              <label className="label-text">Category </label>
              <select
                className={
                  errorState.category
                    ? `form-select ${errorClassName}`
                    : "form-select"
                }
                id="category"
                value={formData.category || ""}
                name="category"
                onChange={handleChange}
              >
                <option value="" placeholder="Please select">
                  {" "}
                  Please select{" "}
                </option>
                {categories.map((category, index) => (
                  <option key={`category-${index}`} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FormErrorNotification inError={errorState.category} />
            </div>
          </section>
          <section className="inventory-form__divider inventory-form__divider--right">
            <h2>Item Availability</h2>
            <div className="inventory-form__divider-detail">
              <label className="label-text">Status</label>
              <div className="inventory-form__status">
                <div className="inventory-form__status-check">
                  <input
                    type="radio"
                    className="form-status--instock"
                    id="in_stock"
                    value="In Stock"
                    checked={formData.status === "In Stock"}
                    onChange={handleStatusChange}
                  />
                  <label
                    className="form-status--instock-label"
                    htmlFor="in_stock"
                  >
                    In stock
                  </label>
                </div>
                <div className="inventory-form__status-check">
                  <input
                    type="radio"
                    className="form-status--outofstock"
                    id="out_of_stock"
                    value="Out of Stock"
                    checked={formData.status === "Out of Stock"}
                    onChange={handleStatusChange}
                  />
                  <label
                    className="item-status__check--outofstock-label"
                    htmlFor="out_of_stock"
                  >
                    Out of stock
                  </label>
                </div>
              </div>
            </div>
            {formData.status === "In Stock" && (
              <div className="inventory-form__divider-detail">
                <label htmlFor="quantity" className="label-text">
                  Quantity
                </label>
                <input
                  type="number"
                  className={
                    errorState.quantity
                      ? `form-input form-input--quantity ${errorClassName}`
                      : "form-input form-input--quantity"
                  }
                  id="quantity"
                  name="quantity"
                  defaultValue={formData.quantity}
                  onChange={handleChange}
                />
                <FormErrorNotification
                  inError={errorState.quantity}
                  text="Number must be greater than zero"
                />
              </div>
            )}
            <div className="inventory-form__divider-detail inventory-form__divider-detail--last">
              <label className="label-text">Warehouse</label>
              <select
                className={
                  errorState.warehouse_name
                    ? `form-select ${errorClassName}`
                    : "form-select"
                }
                id="warehouse"
                name="warehouse_name"
                defaultValue={formData.warehouse_name}
                onChange={handleChange}
              >
                <option>Please select</option>
                {warehouses.map((warehouse, index) => (
                  <option
                    key={`warehouse-${index}`}
                    value={warehouse}
                    onChange={handleStatusChange}
                  >
                    {warehouse}
                  </option>
                ))}
              </select>
              <FormErrorNotification inError={errorState.warehouse_name} />
            </div>
          </section>
        </div>
        <div className="button">
          <CancelButton />
          <AddButton buttonText="Save" />
        </div>
      </form>
    </section>
  );
};

export default EditForm;
