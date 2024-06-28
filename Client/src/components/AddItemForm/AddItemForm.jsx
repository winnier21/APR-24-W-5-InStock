
import React, { useState } from 'react';
import { useNavigate , Link} from "react-router-dom";
import ArrowBackIcon from '../../assets/icons/arrow_back-24px.svg';
import apiInstance  from '../../utils/ApiClient';
import AddButton from '../Button/AddButton/AddButton';
import CancelButton from '../Button/CancelButton/CancelButton';
import ItemDetailsForm from '../ItemDetailsForm/ItemDetailsForm';
import ItemAvailability from '../ItemAvailability/ItemAvailability';
import './AddItemForm.scss';

function AddItemForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "in_stock",
    quantity: 1,
    warehouse: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [errors, setErrors] = useState({});
  
  //need to get from api data to populate dropdown
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const categories = ['Electronics', 'Apparel', 'Accessories', 'Health', 'Gear'];
  const warehouses = ['Manhattan', 'Washington', 'Jersey', 'SF', 'Santa Monica', 'Seattle', 'Miami', 'Boston'];

  const handleBlur = (name) => {
    setActiveField(null);
    validateInput(name, formData[name]);
  };
  const handleFocus = (name) => {
    setActiveField(name);
  };

  const validateInput = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const handleCancel= (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/items");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const requiredFields = ['item_name', 'description', 'category', 'status', 'warehouse'];
    let hasErrors = false;
  
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        hasErrors = true;
        setErrors((prevErrors) => ({...prevErrors, [field]: 'This field is required' }));
      }
    });
  
    if (hasErrors) return;
  
    const formDataToSend = {...formData };
    if (formDataToSend.status === 'out_of_stock') {
      formDataToSend.quantity = '0';
    }
  
    console.log('Form submitted successfully!');
    console.log('Form data:', formDataToSend);
  };
  
    // try {
    //   // const response = await apiInstance.postItem(formDataToSend);
    //   console.log('Form submitted successfully!');
    //   resetForm();
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   setErrors({ error: 'Error submitting form' });
    // }
//   };
  const [status, setStatus] = useState("in_stock"); 
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    if (event.target.value === 'out_of_stock') {
      setFormData({...formData, status: event.target.value, quantity: null });
    } else {
      setFormData({...formData, status: event.target.value, quantity: 1 });
    }
  };
  const resetForm = () => {
    setFormData({
      item_name: '',
      description: '',
      category: '',
      status: 'in_stock',
      quantity: 1,
      warehouse: '',
    });
    setErrors({});
  };

    return (
      <section className="addItemForm">
        <div className="addItemForm__header">
          <div className="addItemForm__header-container">
            <Link to="/inventory">
              <img
                className="arrow-back-icon"
                src={ArrowBackIcon}
                alt="Back to Item List Page"
              />
            </Link>
            <h1 className="addItemForm__title">Add New Item</h1>
          </div>
        </div>
        <section className="forms">
          <section className="forms__container">
            <ItemDetailsForm
                formData={formData}
                setFormData={setFormData}
                activeField={activeField}
                setActiveField={setActiveField}
                handleStatusChange={handleStatusChange}
                categories={categories}
                errors={errors}
             />
            <ItemAvailability
                formData={formData}
                setFormData={setFormData}
                activeField={activeField}
                setActiveField={setActiveField}
                handleStatusChange={handleStatusChange}
                warehouses={warehouses}
                errors={errors}
                />
          </section>
          <div className="button">
            <CancelButton />
            <div className="addItemForm__button"><AddButton buttonText="+ Add Item" />
            </div>
          </div>
        </section>
      </section>
  );
}

export default AddItemForm;