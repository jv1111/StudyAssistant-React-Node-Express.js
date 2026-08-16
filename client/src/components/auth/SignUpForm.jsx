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
        <Form className="auth-form">
          <div className="text-center mb-4">
            <span className="form-eyebrow">GET STARTED</span>

            <h2 className="form-title">Create account</h2>

            <p className="form-description">
              Create your RevBot account to start making quizzes.
            </p>
          </div>

          <div className="d-grid gap-3">
            <FormikTextField type="text" name="username" label="Username" />

            <FormikTextField type="password" name="password" label="Password" />

            {status && (
              <p className="error-message text-center mb-0">{status}</p>
            )}

            <button
              className="btn btn-primary auth-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
