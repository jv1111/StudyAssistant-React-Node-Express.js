import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import ResetPassForm from "../../components/auth/ResetPassForm";
import AuthFormLayout from "../../components/auth/AuthFormLayout";
import AuthFormHeader from "../../components/auth/AuthFormHeader";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import {
  resetPasswordAPI,
  validateResetTokenAPI,
} from "../../api/auth/passwordReset.api";

const ResetPassPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [isValid, setIsValid] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setMessage("This password reset link is missing or invalid.");
        setIsValid(false);
        return;
      }

      try {
        await validateResetTokenAPI(token);

        setIsValid(true);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "This password reset link is invalid or expired.",
        );

        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  const handleResetPassword = async (values, { setSubmitting, setStatus }) => {
    setStatus("");

    try {
      await resetPasswordAPI(token, values.password);

      navigate("/auth");
    } catch (error) {
      setStatus(error.response?.data?.message || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  if (isValid === null) {
    return (
      <Card width="w-95" className="m-auto">
        <AuthFormLayout asForm={false}>
          <AuthFormHeader
            eyebrow="PASSWORD RESET"
            title="Checking reset link"
            description="Please wait while we verify your password reset link."
          />
        </AuthFormLayout>
      </Card>
    );
  }

  if (!isValid) {
    return (
      <Card width="w-95" className="m-auto">
        <AuthFormLayout asForm={false}>
          <AuthFormHeader
            eyebrow="PASSWORD RESET"
            title="Invalid reset link"
            description={message}
          />

          <Link to="/auth">
            <Button type="button">Back to sign in</Button>
          </Link>
        </AuthFormLayout>
      </Card>
    );
  }

  return (
    <Card width="w-95" className="m-auto">
      <ResetPassForm onSubmit={handleResetPassword} />
    </Card>
  );
};

export default ResetPassPage;
