import React, { useState } from "react";
import { useField } from "formik";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Button from "../common/Button";

const FormikTextField = ({ label, type = "text", ...props }) => {
  const [field, meta] = useField({ type, ...props });
  const [showPassword, setShowPassword] = useState(false);
  const hasError = meta.touched && Boolean(meta.error);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field.name}
        className="text-xs font-bold tracking-wide text-foreground"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={field.name}
          placeholder={label}
          type={inputType}
          {...field}
          {...props}
          className={`input-base w-full px-4 py-2.5 ${
            isPassword ? "pr-10" : ""
          } ${hasError ? "input-error" : ""}`}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            iconOnly={true}
            icon={showPassword ? EyeSlash : Eye}
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 text-muted hover:text-foreground"
          />
        )}
      </div>

      {hasError && (
        <p className="mt-0.5 text-xs font-medium text-danger">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikTextField;
