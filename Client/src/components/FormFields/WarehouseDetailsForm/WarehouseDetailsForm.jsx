import React, { useState, useEffect } from "react";
import "./WarehouseDetailsForm.scss";
import ErrorIcon from "../../../assets/icons/error-24px.svg";

const WarehouseDetailsForm = ({ onChange }) => {
    // Define the state for the warehouse details
    const [details, setDetails] = useState({
        warehouseName: '',
        address: '',
        city: '',
        country: ''
    });

    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update local state
        setDetails(prevDetails => {
            const updatedDetails = { ...prevDetails, [name]: value };
            // Propagate changes to parent component
            onChange(updatedDetails);
            return updatedDetails;
        });
    };

    return (
        <form className="warehouse__form">
            <div className="warehouse__form-wrapper1">
                <div className="warehouse__form-wrapper2">
                    <h2>Warehouse Details</h2>
                    <h3>Warehouse Name</h3>
                    <input
                        className="warehouse__form-input"
                        name="warehouseName"
                        type="text"
                        placeholder="Warehouse Name"
                        value={details.warehouseName}
                        onChange={handleChange}
                    />
                    <h3>Street Address</h3>
                    <input
                        className="warehouse__form-input"
                        name="address"
                        type="text"
                        placeholder="Street Address"
                        value={details.address}
                        onChange={handleChange}
                    />
                    <h3>City</h3>
                    <input
                        className="warehouse__form-input"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={details.city}
                        onChange={handleChange}
                    />
                    <h3>Country</h3>
                    <input
                        className="warehouse__form-input"
                        name="country"
                        type="text"
                        placeholder="Country"
                        value={details.country}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </form>
    );
};

export default WarehouseDetailsForm;
