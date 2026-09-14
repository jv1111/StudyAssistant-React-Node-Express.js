import { X } from "react-bootstrap-icons";
import Button from "./Button";

const ModalContainer = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-xs transition-opacity"
    >
      <div
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-150"
      >
        <Button
          variant="ghost"
          icon={X}
          iconOnly
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 bg-background-secondary hover:bg-border hover:text-foreground"
        />

        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
