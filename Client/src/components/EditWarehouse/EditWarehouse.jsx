import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditWarehouse.scss";
import WarehouseDetailsForm from "../FormFields/WarehouseDetailsForm/WarehouseDetailsForm";
import ContactDetailsForm from "../FormFields/ContactDetailsForm/ContactDetailsForm";
import AddButton from "../Button/AddButton/AddButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import Placeholder from "../Placeholder/Placeholder";

function EditWarehouse({ warehousesProps }) {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const { totalEdits, setTotalEdits } = warehousesProps;
  const [warehouseDetails, setWarehouseDetails] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetching initial warehouse data
  useEffect(() => {
    const fetchWarehouse = async () => {
      setLoading(true);
      const BASE_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(
          `${BASE_URL}/api/warehouses/${warehouseId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch warehouse");
        }
        const data = await response.json();
        setWarehouseDetails({
          warehouse_name: data.warehouse_name,
          address: data.address,
          city: data.city,
          country: data.country,
          contact_name: data.contact_name,
          contact_position: data.contact_position,
          contact_phone: data.contact_phone,
          contact_email: data.contact_email,
        });
        setError(""); // Clear any previous errors
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (warehouseId) {
      fetchWarehouse();
    }
  }, [warehouseId]); // Depend on warehouseId to refetch when it changes

  const handleWarehouseDetailsChange = (details) => {
    setWarehouseDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const BASE_URL = import.meta.env.VITE_API_URL;
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/warehouses/${warehouseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            warehouseName: warehouseDetails.warehouse_name,
            address: warehouseDetails.address,
            city: warehouseDetails.city,
            country: warehouseDetails.country,
            contactName: warehouseDetails.contact_name,
            contactPosition: warehouseDetails.contact_position,
            contactPhone: warehouseDetails.contact_phone,
            contactEmail: warehouseDetails.contact_email,
          }),
        }
      );
      if (response.ok) {
        setTotalEdits(totalEdits + 1);
        alert("Warehouse updated successfully!");
        navigate("/warehouse");
      } else {
        throw new Error("Failed to update warehouse");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <Placeholder />; 
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
              details={warehouseDetails}
            />
            <ContactDetailsForm
              onChange={handleWarehouseDetailsChange}
              details={warehouseDetails}
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