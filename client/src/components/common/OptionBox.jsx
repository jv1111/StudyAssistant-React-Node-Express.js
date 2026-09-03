import AuthFormHeader from "../auth/AuthFormHeader";
import Button from "./Button";
import Card from "./Card";
import Modal from "./Modal";

const OptionBox = ({
  isOpen,
  eyebrow,
  title,
  description,
  options,
  onSelect,
  onClose,
  closeLabel = "Cancel",
  closeVariant = "danger",
  showCancel = true,
  cardClassName = "max-w-md",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className={cardClassName}>
        <AuthFormHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-7 flex gap-3">
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={option.variant}
              onClick={() => onSelect(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </Button>
          ))}

          {showCancel && (
            <Button type="button" variant={closeVariant} onClick={onClose}>
              {closeLabel}
            </Button>
          )}
        </div>
      </Card>
    </Modal>
  );
};

export default OptionBox;
