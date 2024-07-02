import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddWarehouse.scss";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import { isValidEmailAddress, isValidPhoneNumber, validateForm } from "../../utils/utils";
import apiInstance from "../../utils/ApiClient";

function AddWarehouse({warehousesProps}) {
  const navigate = useNavigate();
  const { totalEdits, setTotalEdits } = warehousesProps;
  const [warehouseDetails, setWarehouseDetails] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });
  const [errorState, setErrorState] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const handleWarehouseDetailsChange = (details) => {
    setWarehouseDetails((previousDetails) => ({ ...previousDetails, ...details }));
    const { name, value } = details.target;
    setErrorState({
      ...errorState, [name]: null
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {
      warehouse_name: !warehouseDetails.warehouse_name,
      address: warehouseDetails.address?.length < 3 || !warehouseDetails.address,
      city: warehouseDetails.city?.length < 3 || !warehouseDetails.city,
      country: warehouseDetails.country?.length < 3 || !warehouseDetails.country,
      contact_name: warehouseDetails.contact_name?.length < 3 || !warehouseDetails.contact_name,
      contact_position: warehouseDetails.contact_position?.length < 3 || !warehouseDetails.contact_position,
      contact_email: !isValidEmailAddress(warehouseDetails.contact_email),
      contact_phone: !isValidPhoneNumber(warehouseDetails.contact_phone)
    }
    const validFormSubmission = await validateForm(errors, setErrorState); // function to validate form
    if (validFormSubmission) {
      const responseData = await apiInstance.post('warehouses', warehouseDetails);
      if (typeof responseData === 'object') {
        alert(`${warehouseDetails.warehouse_name} successfully added`);
        setTotalEdits(totalEdits + 1);
        navigate(-1);
      } else {
        const message = `Failed to add ${warehouseDetails.warehouse_name}: ${responseData}`;
        alert(message);
      }
    }
  };

  return (
    <main className="addWarehouse__main">
      <section className="addWarehouse">
        <div className="addWarehouse__header">
          <div className="page-top">
            <Link to="/warehouse">
              <img
                className="arrow-back-icon"
                src={BackArrow}
                alt="Back to Warehouse List Page"
              />
            </Link>
            <h1 className="addWarehouse__title">Add New Warehouse</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <section className="form__container">
            <WarehouseDetailsForm
              onChange={handleWarehouseDetailsChange}
              details={warehouseDetails}
              errorState={errorState}
              setErrorState={setErrorState}
            />
            <ContactDetailsForm
              onChange={handleWarehouseDetailsChange}
              details={warehouseDetails}
              errorState={errorState}
              setErrorState={setErrorState}
            />
          </section>
          <div className="button">
            <CancelButton />
            <AddButton buttonText="+ Add Warehouse" />
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddWarehouse;