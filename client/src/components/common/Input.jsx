const Input = ({
  label,
  id,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-muted"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`input-base px-4 py-2.5 disabled:cursor-not-allowed disabled:bg-background-secondary disabled:text-muted disabled:opacity-70 ${className}`}
      />
    </div>
  );
};

export default Input;
