import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import FormikTextField from "../forms/FormikTextField";
import UserValidationSchema from "../../validation/UserValidationSchema";
import { signUpAPI } from "../../api/auth.api";
import { login } from "../../redux/slice/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (userData, { setSubmitting }) => {
    try {
      const response = await signUpAPI(userData);

      if (response.error) {
        alert(response.error);
        return;
      }

      if (response.success) {
        dispatch(login(response.user));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="authForm">
          <h2 className="formTitle">Sign up</h2>

          <FormikTextField type="text" name="username" label="Username" />

          <FormikTextField type="password" name="password" label="Password" />

          <button className="btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
