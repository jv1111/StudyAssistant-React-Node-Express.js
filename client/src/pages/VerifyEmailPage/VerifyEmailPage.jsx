import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../../components/common/Card";
import VerifyEmailForm from "../../components/auth/VerifyEmailForm";

import { verifyEmailAPI } from "../../api/emailVerification.api";
import { updateUser } from "../../redux/slice/authSlice";

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/profile", { replace: true });
    }
  }, [email, navigate]);

  const handleVerifyEmail = async (
    values,
    { setSubmitting, setFieldError },
  ) => {
    try {
      const response = await verifyEmailAPI(values.code);
      console.log("ver response", response);
      dispatch(updateUser(response.user));

      navigate("/profile");
    } catch (error) {
      console.log("ver error", error);
      setFieldError(
        "code",
        error.response?.data?.message || "Verification failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-md px-(--page-padding) py-10">
      <Card className="mt-10 w-full">
        <VerifyEmailForm email={email} onSubmit={handleVerifyEmail} />
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
