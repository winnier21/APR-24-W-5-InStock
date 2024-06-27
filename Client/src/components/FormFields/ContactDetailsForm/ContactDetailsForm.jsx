import React from 'react'

function ContactDetailsForm() {
  return (
    <form className="warehouse__form">
    <h2>Warehouse Details</h2>
    <h3>Warehouse Name</h3>
    <input type="text" placeholder="Warehouse Name"></input>
    <h3>Street Address</h3>
    <input type="text" placeholder="Street Address"></input>
    <h3>City</h3>
    <input type="text" placeholder="City"></input>
    <h3>Country</h3>
    <input type="text" placeholder="Country"></input>
  
</form>
  )
}

export default ContactDetailsForm