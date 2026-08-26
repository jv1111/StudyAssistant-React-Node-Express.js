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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

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
        className={`w-full resize-none overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted outline-none backdrop-blur-xl transition-all duration-200 focus:border-primary/50 focus:bg-white/8 focus:ring-2 focus:ring-primary/10 ${className}`}
      />
    </div>
  );
};

export default AutoAdjustingInput;
