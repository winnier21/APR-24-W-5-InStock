import React from 'react';
import './EditItemPage.scss';
import EditItemForm from '../../components/EditItemForm/EditItemForm'

const EditItemPage = ({ warehousesProps }) => {
  return (
    <>
      <EditItemForm warehousesProps={warehousesProps} />
    </>
  )
}

export default EditItemPage
