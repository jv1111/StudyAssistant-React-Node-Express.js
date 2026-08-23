import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "../Loading/LoadingPage";
import ResetPassForm from "../../components/auth/ResetPassForm";

const ResetPassPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [valid, setIsValid] = useState(false);

  const { userId, token } = useParams();

  if (isLoading) {
    return <LoadingPage />;
  }

  return <div>{valid ? <ResetPassForm /> : <h1>Invalid link</h1>}</div>;
};

export default ResetPassPage;
