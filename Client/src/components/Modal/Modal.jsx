import './Modal.scss';

const Modal = ({modalProps}) => {
  const {
    name, type,
    dialogId,
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
    <dialog id={dialogId} className="modal">
      <form method="dialog" className="modalForm">
        <h1>{question}</h1>
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
