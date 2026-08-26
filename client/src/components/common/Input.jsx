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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none backdrop-blur-xl transition-all duration-200 focus:border-primary/50 focus:bg-white/8 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      />
    </div>
  );
};

export default Input;
