import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditWarehouse.scss";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import Placeholder from "../Placeholder/Placeholder";
import {
  isValidEmailAddress,
  isValidPhoneNumber,
  validateForm,
} from "../../utils/utils";
import apiInstance from "../../utils/ApiClient";

function EditWarehouse({ warehousesProps }) {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const { totalEdits, setTotalEdits } = warehousesProps;
  const [warehouseDetails, setWarehouseDetails] = useState(null);
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
  useEffect(() => {
    const fetchWarehouse = async () => {
      const data = await apiInstance.getItem("warehouses", warehouseId);
      if (data) {
        setWarehouseDetails(data);
      }
    };

    if (warehouseId) {
      fetchWarehouse();
    }
  }, [warehouseId]); // Depend on warehouseId to refetch when it changes

  const handleWarehouseDetailsChange = (details) => {
    setWarehouseDetails((previousDetails) => ({
      ...previousDetails,
      ...details,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {
      warehouse_name: !warehouseDetails.warehouse_name,
      address:
        warehouseDetails.address?.length < 3 || !warehouseDetails.address,
      city: warehouseDetails.city?.length < 3 || !warehouseDetails.city,
      country:
        warehouseDetails.country?.length < 3 || !warehouseDetails.country,
      contact_name:
        warehouseDetails.contact_name?.length < 3 ||
        !warehouseDetails.contact_name,
      contact_position:
        warehouseDetails.contact_position?.length < 3 ||
        !warehouseDetails.contact_position,
      contact_email: !isValidEmailAddress(warehouseDetails.contact_email),
      contact_phone: !isValidPhoneNumber(warehouseDetails.contact_phone),
    };
    const validFormSubmission = await validateForm(errors, setErrorState); // function to validate form
    if (validFormSubmission) {
      const responseData = await apiInstance.put(
        "warehouses",
        warehouseId,
        warehouseDetails
      );
      if (typeof responseData === "object") {
        alert(`${warehouseDetails.warehouse_name} successfully updated`);
        setTotalEdits(totalEdits + 1);
        navigate(-1);
      } else {
        const message = `Failed to edit ${warehouseDetails.warehouse_name}: ${responseData}`;
        alert(message);
      }
    }
  };

  if (!warehouseDetails) {
    return <Placeholder />;
  }

  return (
    <main className="editWarehouse__main">
      <section className="editWarehouse">
        <div className="editWarehouse__header">
          <div className="editWarehouse__header-container">
            <Link to="/warehouse">
              <img
                className="arrow-back-icon"
                src={BackArrow}
                alt="Back to Warehouse List Page"
              />
            </Link>
            <h1 className="editWarehouse__title">Edit Warehouse</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="forms">
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
            <AddButton buttonText="Save" />
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditWarehouse;
