import Card from "../../components/common/Card";
import ForgotPassForm from "../../components/auth/ForgotPassForm";

const ForgotPassPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-md">
        <ForgotPassForm />
      </Card>
    </div>
  );
};

export default ForgotPassPage;
