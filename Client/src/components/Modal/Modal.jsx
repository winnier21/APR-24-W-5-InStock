import React from 'react';

import './Modal.scss';
import CloseIcon from '../CloseIcon/CloseIcon';

const Modal = ({modalProps}) => {
  const {
    name, type,
    dialogRef
  } = modalProps;
  const question = `Delete ${name} ${type}?`;
  let name2;
  let list;
  if (type === 'warehouse') {
    name2 = `the ${name}`;
    list = `the list of ${type}s`;
  } else {
    name2 = name;
    list = `${type} list`
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
          <button 
            className="button--cancel"
          >
            Cancel
          </button>
          <button 
            className="button--delete"
          >
            Delete
          </button>
        </div>
      </form>
      <CloseIcon dialogRef={dialogRef} />
    </dialog>
  )
}

export default Modal
