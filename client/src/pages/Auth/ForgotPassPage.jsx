import { useState } from "react";

import Card from "../../components/common/Card";
import ForgotPassForm from "../../components/auth/ForgotPassForm";

import { requestPasswordResetAPI } from "../../api/auth/passwordReset.api";

const ForgotPassPage = () => {
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus("");

    try {
      await requestPasswordResetAPI(values.email);

      setSentEmail(values.email);
      setIsSent(true);
    } catch (error) {
      setStatus(
        error.response?.data?.message || "Failed to request password reset",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-md">
        <ForgotPassForm
          isSent={isSent}
          sentEmail={sentEmail}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default ForgotPassPage;
