import React from "react";

function ContactDetailsForm() {
  return (
    <form className="warehouse__form">
      <h2>Contact Details</h2>
      <h3>Contact Name</h3>
      <input type="text" placeholder="Contact Name"></input>
      <h3>Position</h3>
      <input type="text" placeholder="Position"></input>
      <h3>Phone Number</h3>
      <input type="text" placeholder="Phone Number"></input>
      <h3>Email</h3>
      <input type="text" placeholder="Email"></input>
    </form>
  );
}

export default ContactDetailsForm;
