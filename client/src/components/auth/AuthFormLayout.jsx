import { Form } from "formik";

const AuthFormLayout = ({ children, asForm = true }) => {
  const className = "flex w-full max-w-md flex-col gap-7";

  if (asForm) {
    return <Form className={className}>{children}</Form>;
  }

  return <div className={className}>{children}</div>;
};

export default AuthFormLayout;
