import {
  CheckCircleFill,
  ExclamationTriangleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import Modal from "./Modal";
import Button from "./Button";

const FeedbackModal = ({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  onConfirm,
  options,
}) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  const config = {
    success: {
      icon: CheckCircleFill,
      iconClass: "text-success bg-success/10 border-success/20",
      buttonVariant: "primary",
    },

    error: {
      icon: XCircleFill,
      iconClass: "text-danger bg-danger/10 border-danger/20",
      buttonVariant: "danger",
    },

    warning: {
      icon: ExclamationTriangleFill,
      iconClass: "text-warning bg-warning/10 border-warning/20",
      buttonVariant: "secondary",
    },
  }[type] || {
    icon: CheckCircleFill,
    iconClass: "text-primary bg-primary/10 border-primary/20",
    buttonVariant: "primary",
  };

  const IconComponent = config.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full border ${config.iconClass}`}
          >
            <IconComponent size={28} />
          </div>

          <h3 className="text-lg font-bold text-foreground">{title}</h3>

          <p className="mt-2 text-sm text-muted">{message}</p>

          <div className="mt-6 flex w-full justify-center gap-3">
            {options?.length > 0 ? (
              options.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={option.variant || config.buttonVariant}
                  onClick={option.onClick}
                  disabled={option.disabled}
                  className="sm:px-8"
                >
                  {option.label}
                </Button>
              ))
            ) : (
              <Button
                type="button"
                variant={config.buttonVariant}
                onClick={handleConfirm}
                className="w-full sm:w-auto sm:px-8"
              >
                OK
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
