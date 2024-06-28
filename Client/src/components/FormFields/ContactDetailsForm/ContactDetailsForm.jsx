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

function ContactDetailsForm({ onChange, details }) {
    const [contactDetails, setContactDetails] = useState({
        contactName: '',
        position: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        if (details) {
            setContactDetails(details);
        }
    }, [details]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedDetails = { ...contactDetails, [name]: value };
        setContactDetails(updatedDetails);
        onChange(updatedDetails);  // Propagate changes up to the parent component
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
                    value={contactDetails.contactName}
                    onChange={handleChange}
                />
                <h3>Position</h3>
                <input
                    className="contact__form-input"
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={contactDetails.position}
                    onChange={handleChange}
                />
                <h3>Phone Number</h3>
                <input
                    className="contact__form-input"
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={contactDetails.phoneNumber}
                    onChange={handleChange}
                />
                <h3>Email</h3>
                <input
                    className="contact__form-input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={contactDetails.email}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default ContactDetailsForm;

