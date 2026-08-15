import React from "react";
import { ErrorMessage, useField } from "formik";

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="inputBox">
      <input id={field.name} placeholder=" " required {...props} {...field} />

      <label
        htmlFor={field.name}
        className={`inputLabel ${meta.error && meta.touched && "hide"}`}
      >
        {label}
      </label>

      <ErrorMessage
        component="label"
        name={field.name}
        className="errorMessage"
      />
    </div>
  );
};

export default FormikTextField;
