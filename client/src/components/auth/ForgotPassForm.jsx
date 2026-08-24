import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

import { requestPasswordResetAPI } from "../../api/passwordReset.api";

const ForgotPassForm = () => {
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus("");

    try {
      const response = await requestPasswordResetAPI(values.email);

      if (!response.success) {
        setStatus(response.message);
        return;
      }

      setSentEmail(values.email);
      setIsSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <AuthFormLayout asForm={false}>
        <AuthFormHeader
          eyebrow="PASSWORD RESET"
          title="Check your email"
          description={`We've sent a password reset link to ${sentEmail}.`}
        />

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm leading-relaxed text-muted">
              The link will expire in 10 minutes. Check your inbox and follow
              the link to create a new password.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 text-sm">
            <span className="text-muted">Didn't receive the email?</span>

            <Button type="button" variant="primary">
              Resend reset link
            </Button>
          </div>
        </div>

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
    );
  }

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
