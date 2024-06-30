import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddWarehouse.scss";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import { isValidEmailAddress } from "../../utils/utils";
import Placeholder from "../../components/Placeholder/Placeholder"

function AddWarehouse() {
  const navigate = useNavigate();
  const [warehouseDetails, setWarehouseDetails] = useState({
    warehouseName: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const handleWarehouseDetailsChange = (details) => {
    setWarehouseDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { contactEmail } = warehouseDetails;

    if (!isValidEmailAddress(contactEmail)) {
        alert("Invalid email address format.");
        return;
    }
    setLoading(true);
    const BASE_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${BASE_URL}/api/warehouses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(warehouseDetails),
      });
      if (response.ok) {
        alert("Warehouse added successfully!");
        navigate("/warehouse");
      } else {
        throw new Error("Failed to add warehouse");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // Set loading to false after the submission is complete
    }
  };

  if (loading) {
    return <Placeholder />; // Render the Placeholder component while loading
  }

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
            />
            <ContactDetailsForm
              onChange={handleWarehouseDetailsChange}
              details={warehouseDetails}
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
