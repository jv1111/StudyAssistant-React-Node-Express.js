import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import FormikTextField from "../forms/FormikTextField";
import Eyebrow from "../common/Eyebrow";
import Button from "../common/Button";

import UserValidationSchema from "../../validation/UserValidationSchema";
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
      const response = await signUpAPI(userData);

      if (!response.success) {
        setStatus(response.message);
        return;
      }

      dispatch(login(response.user));
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
        <Form className="flex flex-col gap-7">
          {/* Header */}
          <div className="text-center">
            <Eyebrow>GET STARTED</Eyebrow>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              Create account
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted">
              Create your RevBot account to start making quizzes.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <FormikTextField type="text" name="username" label="Username" />

            <FormikTextField type="password" name="password" label="Password" />

            {status && (
              <p className="text-center text-sm text-danger">{status}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
