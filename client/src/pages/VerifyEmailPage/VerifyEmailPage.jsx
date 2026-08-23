import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import VerifyEmailForm from "../../components/auth/VerifyEmailForm";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/profile", { replace: true });
    }
  }, [email, navigate]);

  if (!email) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-md px-(--page-padding) py-10">
      <Card className="mt-10 w-full">
        <VerifyEmailForm email={email} onSuccess={() => navigate("/profile")} />
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
