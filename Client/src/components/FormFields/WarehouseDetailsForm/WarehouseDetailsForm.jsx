import React, { useEffect, useState } from "react";
import "./WarehouseDetailsForm.scss";
import FormErrorNotification from "../../FormErrorNotification/FormErrorNotification";

const WarehouseDetailsForm = ({
  onChange,
  details,
  errorState,
  setErrorState,
}) => {
  const inputClassName = "warehouse__form-input";
  const errorClassName = `${inputClassName} error`;
  const [localDetails, setLocalDetails] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    ...details,
  });

  useEffect(() => {
    setLocalDetails({
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      ...details,
    });
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...localDetails, [name]: value };
    setLocalDetails(updatedDetails);
    onChange(updatedDetails);
    setErrorState({ ...errorState, [name]: null });
  };

  return (
    <div className="warehouse__form">
      <div className="warehouse__form-wrapper1">
        <div className="warehouse__form-wrapper2">
          <h2>Warehouse Details</h2>
          <h3>Warehouse Name</h3>
          <input
            className={
              errorState?.warehouse_name ? errorClassName : inputClassName
            }
            name="warehouse_name"
            type="text"
            placeholder="Warehouse Name"
            value={localDetails.warehouse_name}
            onChange={handleChange}
          />
          <FormErrorNotification inError={errorState?.warehouse_name} />
          <h3>Street Address</h3>
          <input
            className={errorState?.address ? errorClassName : inputClassName}
            name="address"
            type="text"
            placeholder="Street Address"
            value={localDetails.address}
            onChange={handleChange}
          />
          <FormErrorNotification inError={errorState?.address} />
          <h3>City</h3>
          <input
            className={errorState?.city ? errorClassName : inputClassName}
            name="city"
            type="text"
            placeholder="City"
            value={localDetails.city}
            onChange={handleChange}
          />
          <FormErrorNotification inError={errorState?.city} />
          <h3>Country</h3>
          <input
            className={errorState?.country ? errorClassName : inputClassName}
            name="country"
            type="text"
            placeholder="Country"
            value={localDetails.country}
            onChange={handleChange}
          />
          <FormErrorNotification inError={errorState?.country} />
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetailsForm;
