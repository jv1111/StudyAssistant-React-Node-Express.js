import { Form } from "formik";

const AuthFormLayout = ({ children, asForm = true }) => {
  const className = "flex w-full flex-col gap-6";

  if (asForm) {
    return <Form className={className}>{children}</Form>;
  }

  return <div className={className}>{children}</div>;
};

export default AuthFormLayout;
