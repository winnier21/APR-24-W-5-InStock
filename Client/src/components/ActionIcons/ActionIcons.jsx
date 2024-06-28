import React from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from "../../assets/icons/edit-24px.svg";

import './ActionIcons.scss';

const ActionIcons = ({ warehouseId, dialogRef }) => {

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
      <Link to={`/warehouse/${warehouseId}/edit`}>
        <img
          src={editIcon}
          alt="edit icon"
        />
      </Link>
    </div>
  )
}

export default ActionIcons
