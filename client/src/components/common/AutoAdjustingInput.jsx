import { useEffect, useRef } from "react";

const AutoAdjustingInput = ({
  label,
  id,
  name,
  value,
  placeholder,
  onChange,
  required = false,
  className = "",
}) => {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="group flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-muted transition-colors group-focus-within:text-primary"
        >
          {label}
        </label>
      )}

      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event);
          adjustHeight();
        }}
        required={required}
        rows={1}
        className={`w-full resize-none overflow-hidden border-b border-border bg-transparent px-1 py-2 text-sm font-medium text-foreground placeholder:text-muted/70 outline-none transition-all duration-200 hover:border-border-hover focus:border-primary ${className}`}
      />
    </div>
  );
};

export default AutoAdjustingInput;
