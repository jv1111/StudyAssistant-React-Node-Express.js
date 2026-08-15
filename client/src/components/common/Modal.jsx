const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popupBackground">
      <div className="popupPanel">
        {children}

        <button
          type="button"
          className="btn-exit"
          onClick={onClose}
          aria-label="Close"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
