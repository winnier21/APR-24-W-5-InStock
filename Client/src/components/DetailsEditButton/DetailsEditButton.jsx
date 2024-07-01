import React from 'react';
import { NavLink } from 'react-router-dom';
import './DetailsEditButton.scss';
import HeaderEditButton from '../../assets/icons/edit-white-24px.svg';

const DetailsEditButton = () => {
  return (
    <>
      <NavLink className="edit-link" to="/">
        <img
          src={HeaderEditButton}
          className="edit-link__icon"
        />
        <h3 className="edit-link__text">Edit</h3>
      </NavLink>
    </>
  )
}

export default DetailsEditButton
