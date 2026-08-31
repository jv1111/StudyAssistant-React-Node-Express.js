import { Formik } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

const VerifyEmailForm = ({ email, onSubmit }) => {
  return (
    <Formik initialValues={{ code: "" }} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <AuthFormLayout>
          <AuthFormHeader
            eyebrow="VERIFICATION REQUIRED"
            title="Verify your email"
            description={`We sent a 6-digit verification code to ${email}.`}
          />

          <FormikTextField
            name="code"
            label="Verification code"
            placeholder="Enter 6-digit code"
            inputMode="numeric"
            maxLength={6}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </Button>
        </AuthFormLayout>
      )}
    </Formik>
  );
};

export default VerifyEmailForm;
