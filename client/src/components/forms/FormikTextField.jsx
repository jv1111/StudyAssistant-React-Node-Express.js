import { useField } from "formik";

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field.name}
        className="text-xs font-bold tracking-wide text-foreground"
      >
        {label}
      </label>

      <input
        id={field.name}
        placeholder={label}
        {...field}
        {...props}
        className={`input-base px-4 py-2.5 ${hasError ? "input-error" : ""}`}
      />

      {hasError && (
        <p className="mt-0.5 text-xs font-medium text-danger">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikTextField;
