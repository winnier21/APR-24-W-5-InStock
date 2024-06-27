import React from 'react'
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from "../../assets/icons/edit-24px.svg";

import './ActionIcons.scss';

const ActionIcons = () => {
  return (
    <div className="action-icons">
      <img src={deleteIcon} />
      <img src={editIcon} />
    </div>
  )
}

export default ActionIcons
