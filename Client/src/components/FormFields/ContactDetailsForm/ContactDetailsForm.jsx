import React, { useEffect, useState } from "react";
import "./ContactDetailsForm.scss";

function ContactDetailsForm({ onChange, details }) {
  const [contactDetails, setContactDetails] = useState({
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
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
          value={contactDetails.contact_name}
          onChange={handleChange}
        />
        <h3>Position</h3>
        <input
          className="contact__form-input"
          type="text"
          name="contactPosition"
          placeholder="Position"
          value={contactDetails.contact_position}
          onChange={handleChange}
        />
        <h3>Phone Number</h3>
        <input
          className="contact__form-input"
          type="text"
          name="contactPhone"
          placeholder="Phone Number"
          value={contactDetails.contact_phone}
          onChange={handleChange}
        />
        <h3>Email</h3>
        <input
          className="contact__form-input"
          type="text"
          name="contactEmail"
          placeholder="Email"
          value={contactDetails.contact_email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ContactDetailsForm;
