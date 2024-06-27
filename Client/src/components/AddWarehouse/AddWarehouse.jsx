import "./AddWarehouse.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import React from "react";

function AddWarehouse() {
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
        <section className="forms">
          <div className="forms__container">
            <WarehouseDetailsForm />
            <ContactDetailsForm />
          </div>
          <div className="button">
            <button className="button-cancel" type="button">
              <h3>Cancel</h3>
            </button>
            <button className="button-add" type="submit">
             <h3>+ Add Warehouse</h3> 
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AddWarehouse;
