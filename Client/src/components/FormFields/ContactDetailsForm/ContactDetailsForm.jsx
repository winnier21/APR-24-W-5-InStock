// import React from "react";
// import './ContactDetailsForm.scss';

// function ContactDetailsForm() {
//   return (
//     <form className="contact__form">
//       <div className="contact__form-wrapper">
//       <h2>Contact Details</h2>
//       <h3>Contact Name</h3>
//       <input className="contact__form-input" type="text" placeholder="Contact Name"></input>
//       <h3>Position</h3>
//       <input className="contact__form-input" type="text" placeholder="Position"></input>
//       <h3>Phone Number</h3>
//       <input className="contact__form-input" type="text" placeholder="Phone Number"></input>
//       <h3>Email</h3>
//       <input className="contact__form-input" type="text" placeholder="Email"></input>
//       </div>
//     </form>
//   );
// }

// export default ContactDetailsForm;
import React, { useEffect, useState } from "react";
import './ContactDetailsForm.scss';

const ContactDetailsForm = ({ onChange, details }) => {
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
      <div className="contact__form">
        <div className="contact__form-wrapper">
            <h2>Contact Details</h2>
            <h3>Contact Name</h3>
            <input
                className="contact__form-input"
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={localDetails.contactName}
                onChange={handleChange}
            />
            <h3>Position</h3>
            <input
                className="contact__form-input"
                type="text"
                name="contactPosition"
                placeholder="Position"
                value={localDetails.contactPosition}
                onChange={handleChange}
            />
            <h3>Phone Number</h3>
            <input
                className="contact__form-input"
                type="text"
                name="contactPhone"
                placeholder="Phone Number"
                value={localDetails.contactPhone}
                onChange={handleChange}
            />
            <h3>Email</h3>
            <input
                className="contact__form-input"
                type="text"
                name="contactEmail"
                placeholder="Email"
                value={localDetails.contactEmail}
                onChange={handleChange}
            />
        </div>
        </div>
    );
};

export default ContactDetailsForm;

