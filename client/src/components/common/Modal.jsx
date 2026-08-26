import { X } from "react-bootstrap-icons";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="presentation"
      onMouseDown={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-xs transition-opacity"
    >
      <div
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-150"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background-secondary text-muted transition-colors hover:bg-border hover:text-foreground"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
