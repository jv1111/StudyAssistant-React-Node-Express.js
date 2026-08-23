import { useDispatch } from "react-redux";
import { Formik } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

import { verifyEmailAPI } from "../../api/emailVerification.api";
import { updateUser } from "../../redux/slice/authSlice";

const VerifyEmailForm = ({ email, onSuccess }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await verifyEmailAPI(values.code);

      if (!response.success) {
        setFieldError("code", response.message);
        return;
      }

      dispatch(updateUser(response.user));
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ code: "" }} onSubmit={handleSubmit}>
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
