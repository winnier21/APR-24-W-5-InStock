import React from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from "../../assets/icons/edit-24px.svg";

import './ActionIcons.scss';

const ActionIcons = ({warehouseId, modalRef}) => {
  // const dialogElement = document.getElementById(dialogId);
  // console.log(dialogElement);

  const deleteHandler = (event) => {
    console.log(modalRef.current)
    modalRef.current.showModal();
    console.log('Delete button clicked.')
  }

  return (
    <div className="action-icons">
      <img
        onClick={deleteHandler}
        src={deleteIcon}
        className="delete-icon"
      />
      <Link to={`/warehouse/${warehouseId}/edit`}>
        <img src={editIcon} />
      </Link>
    </div>
  )
}

export default ActionIcons
