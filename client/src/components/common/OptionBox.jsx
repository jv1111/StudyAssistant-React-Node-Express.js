import AuthFormHeader from "../auth/AuthFormHeader";
import Button from "./Button";
import Card from "./Card";
import ModalContainer from "./ModalContainer";

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
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <Card className={cardClassName}>
        <AuthFormHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={option.variant}
              onClick={() => onSelect(option.value)}
              disabled={option.disabled}
              className="w-full sm:flex-1"
            >
              {option.label}
            </Button>
          ))}

          {showCancel && (
            <Button
              type="button"
              variant={closeVariant}
              onClick={onClose}
              className="w-full sm:flex-1"
            >
              {closeLabel}
            </Button>
          )}
        </div>
      </Card>
    </ModalContainer>
  );
};

export default OptionBox;
