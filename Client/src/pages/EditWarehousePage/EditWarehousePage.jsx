import React from "react";
import EditWarehouse from "../../components/EditWarehouse/EditWarehouse";

const EditWarehousePage = ({ warehousesProps }) => {
  return (
    <>
      <EditWarehouse warehousesProps={warehousesProps} />
    </>
  );
};

export default EditWarehousePage;
