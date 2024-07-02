import React, { useEffect, useState } from "react";
import "./ContactDetailsForm.scss";
import FormErrorNotification from "../../FormErrorNotification/FormErrorNotification";

function ContactDetailsForm({ onChange, details, errorState, setErrorState }) {
  const inputClassName = "contact__form-input";
  const errorClassName = `${inputClassName} error`;
  const [contactDetails, setContactDetails] = useState({
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
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
    setErrorState({ ...errorState, [name]: null });
  };

  return (
    <div className="contact__form">
      <div className="contact__form-wrapper">
        <h2>Contact Details</h2>
        <h3>Contact Name</h3>
        <input
          className={errorState?.contact_name ? errorClassName : inputClassName}
          type="text"
          name="contact_name"
          placeholder="Contact Name"
          value={contactDetails.contact_name}
          onChange={handleChange}
        />
        <FormErrorNotification inError={errorState?.contact_name} />
        <h3>Position</h3>
        <input
          className={
            errorState?.contact_position ? errorClassName : inputClassName
          }
          type="text"
          name="contact_position"
          placeholder="Position"
          value={errorState?.contact_position}
          onChange={handleChange}
        />
        <FormErrorNotification inError={errorState?.country} />
        <h3>Phone Number</h3>
        <input
          className={
            errorState?.contact_phone ? errorClassName : inputClassName
          }
          type="text"
          name="contact_phone"
          placeholder="Phone Number"
          value={contactDetails.contact_phone}
          onChange={handleChange}
        />
        <FormErrorNotification
          inError={errorState?.contact_phone}
          text="Phone number must be in the format +1 (111) 1111-1111"
        />
        <h3>Email</h3>
        <input
          className={
            errorState?.contact_email ? errorClassName : inputClassName
          }
          type="text"
          name="contact_email"
          placeholder="Email"
          value={contactDetails.contact_email}
          onChange={handleChange}
        />
        <FormErrorNotification
          inError={errorState?.contact_email}
          text="Invalid email format"
        />
      </div>
    </div>
  );
}

export default ContactDetailsForm;
