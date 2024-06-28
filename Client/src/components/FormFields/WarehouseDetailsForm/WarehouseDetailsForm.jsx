// import React from "react";
// import "./WarehouseDetailsForm.scss";
// import "./WarehouseDetailsForm.scss";
// import ErrorIcon from "../../../assets/icons/error-24px.svg";

// const WarehouseDetailsForm = ({

// }) => {
//   return (
//     <form className="warehouse__form">
//       <div className="warehouse__form-wrapper1">
//         <div className="warehouse__form-wrapper2">
//           <h2>Warehouse Details</h2>
//         <h3>Warehouse Name</h3>
//         <input className="warehouse__form-input" type="text" placeholder="Warehouse Name"></input>
//         <h3>Street Address</h3>
//         <input className="warehouse__form-input" type="text" placeholder="Street Address"></input>
//         <h3>City</h3>
//         <input className="warehouse__form-input"type="text" placeholder="City"></input>
//         <h3>Country</h3>
//         <input className="warehouse__form-input" type="text" placeholder="Country"></input>
//         </div>
        
//         </div>
        
      
//     </form>
//   );
// };

// export default WarehouseDetailsForm;
import React, { useEffect, useState } from "react";
import "./WarehouseDetailsForm.scss";

const WarehouseDetailsForm = ({ onChange, details }) => {
    const [localDetails, setLocalDetails] = useState(details);

    useEffect(() => {
        setLocalDetails(details);
    }, [details]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedDetails = { ...localDetails, [name]: value };
        setLocalDetails(updatedDetails);
        onChange(updatedDetails);
    };

    return (
      <div className="warehouse__form">
        <div className="warehouse__form-wrapper1">
            <div className="warehouse__form-wrapper2">
                <h2>Warehouse Details</h2>
                <h3>Warehouse Name</h3>
                <input
                    className="warehouse__form-input"
                    name="warehouseName"
                    type="text"
                    placeholder="Warehouse Name"
                    value={localDetails.warehouseName}
                    onChange={handleChange}
                />
                <h3>Street Address</h3>
                <input
                    className="warehouse__form-input"
                    name="address"
                    type="text"
                    placeholder="Street Address"
                    value={localDetails.address}
                    onChange={handleChange}
                />
                <h3>City</h3>
                <input
                    className="warehouse__form-input"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={localDetails.city}
                    onChange={handleChange}
                />
                <h3>Country</h3>
                <input
                    className="warehouse__form-input"
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={localDetails.country}
                    onChange={handleChange}
                />
            </div>
        </div>
        </div>
    );
};

export default WarehouseDetailsForm;

