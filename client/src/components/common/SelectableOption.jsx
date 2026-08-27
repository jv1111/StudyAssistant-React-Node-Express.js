// components/common/SelectableOption.jsx
const SelectableOption = ({
  selected = false,
  disabled = false,
  onClick,
  title = "",
  icon: Icon,
  label,
  description,
  className = "",
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
      className={`flex items-start gap-2.5 rounded-lg border p-2.5 text-left transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed opacity-50 border-border/40 bg-surface/50"
          : selected
            ? "border-primary bg-primary-light/50 text-foreground shadow-xs hover:cursor-pointer"
            : "border-border/80 bg-surface text-muted hover:border-primary/40 hover:text-foreground hover:cursor-pointer"
      } ${className}`}
    >
      {Icon && (
        <Icon
          size={16}
          className={`mt-0.5 shrink-0 ${
            selected && !disabled ? "text-primary" : "text-muted"
          }`}
        />
      )}

      <div className="flex flex-col">
        <span className="text-xs font-bold leading-tight">{label}</span>
        {description && (
          <span className="mt-0.5 text-[11px] leading-tight text-muted">
            {description}
          </span>
        )}
      </div>
    </button>
  );
};

export default SelectableOption;
