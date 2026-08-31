import { Formik } from "formik";
import { Link } from "react-router-dom";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

import PasswordResetValidationSchema from "../../validation/passwordReset.validationSchema";

const ResetPassForm = ({ onSubmit }) => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PasswordResetValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <AuthFormLayout>
          <AuthFormHeader
            eyebrow="PASSWORD RESET"
            title="Create a new password"
            description="Enter your new password below."
          />

          <div className="flex flex-col gap-4">
            <FormikTextField
              type="password"
              name="password"
              label="New password"
            />

            <FormikTextField
              type="password"
              name="confirmPassword"
              label="Confirm password"
            />

            {status && (
              <p className="text-center text-sm text-danger">{status}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Reset password"}
          </Button>

          <p className="text-center text-sm text-muted">
            Remember your password?{" "}
            <Link
              to="/auth"
              className="text-primary transition-colors hover:text-primary-hover"
            >
              Sign in
            </Link>
          </p>
        </AuthFormLayout>
      )}
    </Formik>
  );
};

export default ResetPassForm;
