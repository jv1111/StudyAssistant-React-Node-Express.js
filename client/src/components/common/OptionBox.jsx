import AuthFormHeader from "../auth/AuthFormHeader";
import Button from "./Button";

const OptionBox = ({
  eyebrow,
  title,
  description,
  options,
  onSelect,
  onClose,
  closeLabel = "Cancel",
}) => {
  return (
    <div>
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

        <Button type="button" variant="danger" onClick={onClose}>
          {closeLabel}
        </Button>
      </div>
    </div>
  );
};

export default OptionBox;
