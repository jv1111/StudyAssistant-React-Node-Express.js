import React from "react";
import { Formik, Form } from "formik";
import UserValidationSchema from "../validation/UserValidationSchema";
import FormikTextField from "./FormikTextField";
import { signUpAPI } from "../api/AuthApi";
import { login } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const submitHandler = async (userData) => {
    const response = await signUpAPI(userData);
    if (response.error) {
      alert(response.error);
    } else if (response.success) {
      dispatch(login(response.user));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserValidationSchema}
      onSubmit={async (userData, { setSubmitting }) => {
        await submitHandler(userData);
        setSubmitting(false); //Enable submit button
      }}
    >
      {({ isSubmitting }) => (
        <Form className="authForm">
          <h2 className="formTitle">Sign up</h2>
          <FormikTextField type="text" name="username" label="Username" />
          <FormikTextField type="password" name="password" label="Password" />
          <button
            className="btn-primary"
            type="submit"
            disabled={isSubmitting} //disable the button when submitting
          >
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
