import React from "react";
import "./WarehouseDetailsForm.scss";
import "./WarehouseDetailsForm.scss";
import ErrorIcon from "../../../assets/icons/error-24px.svg";

const WarehouseDetailsForm = ({

}) => {
  return (
    <form className="warehouse__form">
        <h2>Warehouse Details</h2>
        <h3>Warehouse Name</h3>
        <input className="warehouse__form-input" type="text" placeholder="Warehouse Name"></input>
        <h3>Street Address</h3>
        <input className="warehouse__form-input" type="text" placeholder="Street Address"></input>
        <h3>City</h3>
        <input className="warehouse__form-input"type="text" placeholder="City"></input>
        <h3>Country</h3>
        <input className="warehouse__form-input" type="text" placeholder="Country"></input>
      
    </form>
  );
};

export default WarehouseDetailsForm;
