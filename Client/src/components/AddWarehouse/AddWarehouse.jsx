import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddWarehouse.scss";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";

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

  const handleWarehouseDetailsChange = (details) => {
    setWarehouseDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/warehouse/add", {
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
    }
  };

  return (
    <main className="addWarehouse__main">
      <section className="addWarehouse">
        <div className="addWarehouse__header">
          <div className="addWarehouse__header-container">
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
        <form onSubmit={handleSubmit} className="forms">
          <section className="forms__container">
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
