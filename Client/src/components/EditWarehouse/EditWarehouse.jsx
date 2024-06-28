import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./EditWarehouse.scss";
import WarehouseDetailsForm from '../FormFields/WarehouseDetailsForm/WarehouseDetailsForm';
import ContactDetailsForm from '../FormFields/ContactDetailsForm/ContactDetailsForm';
import AddButton from '../Button/AddButton/AddButton';
import CancelButton from '../Button/CancelButton/CancelButton';
import BackArrow from '../../assets/icons/arrow_back-24px.svg';

function EditWarehouse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState({
        warehouseName: '',
        address: '',
        city: '',
        country: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        contactEmail: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const response = await fetch(`/api/warehouses/${id}`);
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
                        contactEmail: data.contact_email
                    });
                } else {
                    throw new Error('Failed to fetch warehouse details');
                }
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchWarehouse();
    }, [id]);

    const handleWarehouseDetailsChange = (details) => {
        setWarehouse(prev => ({ ...prev, ...details }));
    };

    const handleContactDetailsChange = (details) => {
        setWarehouse(prev => ({ ...prev, ...details }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/warehouses/${id}/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(warehouse)
            });
            if (response.ok) {
                alert('Warehouse updated successfully!');
                navigate('/warehouse'); // Adjust the redirect as necessary
            } else {
                throw new Error('Failed to update warehouse');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="editWarehouse__main">
            <section className="editWarehouse">
                <div className="editWarehouse__header">
                    <div className="editWarehouse__header-container">
                        <Link to="/warehouse">
                            <img src={BackArrow} alt="Back to Warehouse List" className="arrow-back-icon" />
                        </Link>
                        <h1 className="editWarehouse__title">Edit Warehouse</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="forms">
                    <section className="forms__container">
                        <WarehouseDetailsForm onChange={handleWarehouseDetailsChange} details={warehouse} />
                        <ContactDetailsForm onChange={handleContactDetailsChange} details={warehouse} />
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
