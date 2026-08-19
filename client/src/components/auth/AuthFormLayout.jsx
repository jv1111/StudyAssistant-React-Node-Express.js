import { Form } from "formik";

const AuthFormLayout = ({ children }) => {
  return (
    <Form className="flex w-full max-w-md flex-col gap-7">{children}</Form>
  );
};

export default AuthFormLayout;
