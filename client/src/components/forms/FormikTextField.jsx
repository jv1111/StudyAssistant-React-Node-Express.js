import { ErrorMessage, useField } from "formik";

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field.name}
        className="text-xs font-bold tracking-wide text-[var(--color-text-label)]"
      >
        {label}
      </label>
      <input
        id={field.name}
        placeholder={label}
        required
        {...props}
        {...field}
        className="w-full rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] px-4 py-3 text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-text-placeholder)] transition-all duration-200 outline-none focus:outline-none focus:border-[var(--color-border-focus)] focus:bg-[var(--color-bg-input-focus)] focus:ring-1 focus:ring-[var(--color-ring-focus)]"
      />

      {meta.touched && meta.error && (
        <ErrorMessage
          component="p"
          name={field.name}
          className="mt-0.5 text-xs font-medium text-[var(--color-danger)]"
        />
      )}
    </div>
  );
};

export default FormikTextField;
