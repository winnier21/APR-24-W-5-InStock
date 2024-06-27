import React from 'react';

import './Modal.scss';

const Modal = ({modalProps}) => {
  const {
    name, type,
    formRef
  } = modalProps;
  const question = `Delete ${name} ${type}?`;
  let name2;
  let list;
  if (type === 'warehouse') {
    name2 = `the ${name}`;
    list = `the list of ${name}s`;
  } else {
    name2 = question;
    list = `${type} list`
  }

  const disclaimer = `
  Please confirm that you'd like to delete ${name2} from the ${list}. You won't be able to undo this action.
  `
  return (
    <dialog
      ref={formRef}
      className="modal"
    >
      <section className="page-top">
        <h1>{question}</h1>
      </section>
      <form method="dialog" className="modal-form">
        
        <p>
          {disclaimer}
        </p>
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
      </form>
    </dialog>
  )
}

export default Modal
