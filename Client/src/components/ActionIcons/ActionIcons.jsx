import React from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from "../../assets/icons/edit-24px.svg";

import './ActionIcons.scss';

const ActionIcons = ({ warehouseId, itemId, dialogRef, editPath }) => {
  let id;
  // let route;
  if (itemId) {
    id = itemId
    // route = 'inventory';
  } else {
    id = warehouseId
    // route = 'warehouse';
  }

  const deleteHandler = (event) => {
    dialogRef.current.showModal();
  }

  return (
    <div className="action-icons">
      <img
        onClick={deleteHandler}
        src={deleteIcon}
        className="delete-icon"
        alt="delete icon"
      />
      <Link to={`/${editPath}/${id}/edit`}>
        <img
          src={editIcon}
          alt="edit icon"
        />
      </Link>
    </div>
  )
}

export default ActionIcons
