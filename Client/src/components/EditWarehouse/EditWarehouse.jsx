import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditWarehouse.scss";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import Placeholder from "../Placeholder/Placeholder";

function EditWarehouse() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [warehouse, setWarehouse] = useState({
    warehouseName: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [setIsLoading] = useState(true);
  const [setError] = useState("");

  useEffect(() => {
    const fetchWarehouse = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${BASE_URL}/api/warehouses/${id}`);
        const data = await response.json();
        if (response.ok) {
          setWarehouse({
            warehouseName: data.warehouse_name,
            address: data.address,
            city: data.city,
            country: data.country,
            contactName: data.contact_name,
            contactPosition: data.contact_position,
            contactPhone: data.contact_phone,
            contactEmail: data.contact_email,
          });
        } else {
          throw new Error("Failed to fetch warehouse details");
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchWarehouse();
  }, [id]);

  const handleWarehouseDetailsChange = (details) => {
    setWarehouse((prev) => ({ ...prev, ...details }));
  };

  const handleContactDetailsChange = (details) => {
    setWarehouse((prev) => ({ ...prev, ...details }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const BASE_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${BASE_URL}/api/warehouses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(warehouse),
      });
      if (response.ok) {
        alert("Warehouse updated successfully!");
        navigate("/warehouse"); // Adjust the redirect as necessary
      } else {
        throw new Error("Failed to update warehouse");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  if (loading) {
    return <Placeholder />; // Render the Placeholder component while loading
  }

  return (
    <main className="editWarehouse__main">
      <section className="editWarehouse">
        <div className="editWarehouse__header">
          <div className="editWarehouse__header-container">
            <Link to="/warehouse">
              <img
                className="arrow-back-icon"
                src={BackArrow}
                alt="Back to Warehouse List Page"
              />
            </Link>
            <h1 className="editWarehouse__title">Edit Warehouse</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="forms">
          <section className="form__container">
            <WarehouseDetailsForm
              onChange={handleWarehouseDetailsChange}
              details={warehouse}
            />
            <ContactDetailsForm
              onChange={handleContactDetailsChange}
              details={warehouse}
            />
          </section>
          <div className="button">
            <CancelButton />
            <AddButton buttonText="Save" />
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditWarehouse;
