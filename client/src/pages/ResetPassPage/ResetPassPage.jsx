import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ResetPassForm from "../../components/auth/ResetPassForm";
import AuthFormLayout from "../../components/auth/AuthFormLayout";
import AuthFormHeader from "../../components/auth/AuthFormHeader";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { validateResetTokenAPI } from "../../api/passwordReset.api";

const ResetPassPage = () => {
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

      const response = await validateResetTokenAPI(token);

      if (!response.success) {
        setMessage(response.message);
        setIsValid(false);
        return;
      }

      setIsValid(true);
    };

    validateToken();
  }, [token]);

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
      <ResetPassForm token={token} />
    </Card>
  );
};

export default ResetPassPage;
