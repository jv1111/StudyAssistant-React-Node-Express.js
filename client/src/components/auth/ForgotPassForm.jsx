import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

import { requestPasswordResetAPI } from "../../api/user.api";

const ForgotPassForm = () => {
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus("");

      const response = await requestPasswordResetAPI(values.email);

      if (response.error) {
        setStatus(response.error);
        return;
      }

      if (response.success) {
        alert("Password reset email sent");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, status }) => (
        <AuthFormLayout>
          <AuthFormHeader
            eyebrow="PASSWORD RESET"
            title="Forgot password?"
            description="Enter your email and we'll send you a link to reset your password."
          />

          <div className="flex flex-col gap-4">
            <FormikTextField
              type="email"
              name="email"
              label="Enter your email"
            />

            {status && (
              <p className="text-center text-sm text-danger">{status}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link"}
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

export default ForgotPassForm;
