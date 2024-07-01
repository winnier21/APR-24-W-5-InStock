import React from 'react';

import './Modal.scss';
import CloseIcon from '../CloseIcon/CloseIcon';
import Button from '../Button/Button';
import apiInstance from '../../utils/ApiClient';
import CancelButton from "../Button/CancelButton/CancelButton";
import AddButton from "../Button/AddButton/AddButton";

const Modal = ({modalProps}) => {
  const {
    id, name, type, dialogRef,
    totalEdits, setTotalEdits,
    inventoryArray, setInventoryArray
  } = modalProps;

  const question = `Delete ${name} ${type}?`;
  let name2;
  let list;
  let route;
  if (type === 'warehouse') {
    name2 = `the ${name}`;
    route = 'warehouses';
    list = `the list of ${type}`;
  } else {
    name2 = name;
    list = `${type} list`;
    route = 'inventories';
  }

  const buttonHandler = async (event) => {
    const response = await apiInstance.delete(route, id);
    if (response && setTotalEdits) {
      setTotalEdits(totalEdits + 1 )
    } else if (response) {
      setInventoryArray(inventoryArray.filter(
        object => object.id !== id)
      )
    }
  }

  const disclaimer = `
  Please confirm that you'd like to delete ${name2} from the ${list}. You won't be able to undo this action.
  `

  return (
    <dialog
      ref={dialogRef}
      className="modal"
    >
      <form method="dialog" className="modal__form">
        <h1>{question}</h1>
        <p className="modal__body">
          {disclaimer}
        </p>
        <div className="modal__buttons">
        <CancelButton className="button-cancel"/>
          <Button 
            className="button-delete"
            text="Delete"
            buttonHandler={buttonHandler}
          />
        </div>
      </form>
      <CloseIcon dialogRef={dialogRef} />
    </dialog>
  )
}

export default Modal
