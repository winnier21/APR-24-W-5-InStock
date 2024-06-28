import React from 'react';
import './CloseIcon.scss';
import closeIcon from '../../assets/icons/close-24px.svg';

const CloseIcon = ({ dialogRef }) => {

  const clickHandler = (event) => {
    dialogRef.current.close();
  }
  
  return (
    <img
      src={closeIcon}
      alt="close dialog icon"
      onClick={clickHandler}
      className="close-icon"
    />
  )
}

export default CloseIcon
