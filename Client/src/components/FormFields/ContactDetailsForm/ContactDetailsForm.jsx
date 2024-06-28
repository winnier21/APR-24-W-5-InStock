import React from "react";
import './ContactDetailsForm.scss';

function ContactDetailsForm() {
  return (
    <form className="contact__form">
      <div className="contact__form-wrapper">
      <h2>Contact Details</h2>
      <h3>Contact Name</h3>
      <input className="contact__form-input" type="text" placeholder="Contact Name"></input>
      <h3>Position</h3>
      <input className="contact__form-input" type="text" placeholder="Position"></input>
      <h3>Phone Number</h3>
      <input className="contact__form-input" type="text" placeholder="Phone Number"></input>
      <h3>Email</h3>
      <input className="contact__form-input" type="text" placeholder="Email"></input>
      </div>
    </form>
  );
}

export default ContactDetailsForm;
