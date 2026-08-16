import { ErrorMessage, useField } from "formik";

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-field">
      <input
        id={field.name}
        placeholder={label}
        required
        {...props}
        {...field}
      />

      {meta.touched && meta.error && (
        <ErrorMessage
          component="p"
          name={field.name}
          className="error-message"
        />
      )}
    </div>
  );
};

export default FormikTextField;
