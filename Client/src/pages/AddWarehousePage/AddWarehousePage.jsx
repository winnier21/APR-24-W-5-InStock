import React from "react";
import AddWarehouse from "../../components/AddWarehouse/AddWarehouse";

const AddWarehousePage = ({ setWarehousesArray }) => {
  return (
    <>
      <AddWarehouse setWarehousesArray={setWarehousesArray} />
    </>
  );
};

export default AddWarehousePage;

