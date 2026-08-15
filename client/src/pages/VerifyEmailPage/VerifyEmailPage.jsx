import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { verifyEmailAPI } from "../../api/user.api";

const VerifyEmailPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [valid, setIsValid] = useState(false);
  const { userId, token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const verificationResponse = await verifyEmailAPI(userId, token);
      if (verificationResponse.success) setIsValid(true);
      else setIsValid(false);
      setLoading(false);
    };
    verifyEmail();
  }, [token, userId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="validation-page container">
      {valid ? (
        <h1>Your email is verified successfully</h1>
      ) : (
        <h1>Invalid link</h1>
      )}
    </div>
  );
};

export default VerifyEmailPage;
