const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-backdrop-custom"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="modal-dialog-custom"
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
