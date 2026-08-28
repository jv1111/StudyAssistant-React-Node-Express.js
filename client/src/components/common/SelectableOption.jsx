import { CheckCircle } from "react-bootstrap-icons";

const SelectableOption = ({
  selected = false,
  disabled = false,
  onClick,
  title = "",
  icon: Icon,
  optionLabel,
  label,
  description,
  showSelectedIndicator = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
      className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed border-border/40 bg-surface/50 opacity-50"
          : selected
            ? "border-primary bg-primary-light/60 text-foreground shadow-sm ring-2 ring-primary/20"
            : "border-border bg-background-secondary/30 text-foreground/90 hover:border-primary/50 hover:bg-primary-light/20"
      } ${className}`}
    >
      {optionLabel && (
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
            selected
              ? "bg-primary text-white"
              : "border border-border bg-surface text-foreground group-hover:border-primary/40 group-hover:text-primary"
          }`}
        >
          {optionLabel}
        </span>
      )}

      {Icon && (
        <Icon
          size={16}
          className={`shrink-0 ${
            selected && !disabled ? "text-primary" : "text-muted"
          }`}
        />
      )}

      <div className="flex flex-col">
        <span
          className={`text-sm font-medium transition-colors ${
            selected
              ? "font-bold text-foreground"
              : "text-foreground/90 group-hover:text-foreground"
          }`}
        >
          {label}
        </span>

        {description && (
          <span className="mt-0.5 text-[11px] leading-tight text-muted">
            {description}
          </span>
        )}
      </div>

      {showSelectedIndicator && selected && (
        <CheckCircle
          className="absolute right-4 shrink-0 text-primary"
          size={18}
        />
      )}
    </button>
  );
};

export default SelectableOption;
