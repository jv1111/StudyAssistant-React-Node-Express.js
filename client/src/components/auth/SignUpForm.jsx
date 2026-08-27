import { Formik } from "formik";
import { useDispatch } from "react-redux";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

import UserValidationSchema from "../../validation/user.validationSchema";
import { signUpAPI } from "../../api/auth.api";
import { login } from "../../redux/slice/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (userData, { setSubmitting, setStatus }) => {
    try {
      setStatus("");

      const response = await signUpAPI(userData);

      dispatch(login(response.user));
    } catch (error) {
      setStatus(error.response?.data?.message || "Registration failed");
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
      {({ isSubmitting, status }) => (
        <AuthFormLayout>
          <AuthFormHeader
            eyebrow="GET STARTED"
            title="Create account"
            description="Create your QuizBuilder account to start making quizzes."
          />

          <div className="flex flex-col gap-4">
            <FormikTextField type="text" name="username" label="Username" />
            <FormikTextField type="password" name="password" label="Password" />

            {status && (
              <p className="rounded-lg bg-danger/10 p-2 text-center text-xs font-semibold text-danger">
                {status}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </AuthFormLayout>
      )}
    </Formik>
  );
};

export default SignUpForm;
