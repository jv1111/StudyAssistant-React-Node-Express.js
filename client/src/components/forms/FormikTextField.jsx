import { ErrorMessage, useField } from "formik";

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-2">
      <input
        id={field.name}
        placeholder={label}
        required
        {...props}
        {...field}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none backdrop-blur-xl transition-all duration-200 focus:border-primary/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-primary/10"
      />

      {meta.touched && meta.error && (
        <ErrorMessage
          component="p"
          name={field.name}
          className="text-sm text-danger"
        />
      )}
    </div>
  );
};

export default FormikTextField;
