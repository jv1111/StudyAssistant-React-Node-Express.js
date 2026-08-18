import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import FormikTextField from "../forms/FormikTextField";
import GoogleSignIn from "../../assets/img/google-signin.png";
import { loginAPI } from "../../api/auth.api";
import { login } from "../../redux/slice/authSlice";

const LoginForm = ({ onSignUp }) => {
  const dispatch = useDispatch();

  const initialValues = {
    usernameOrEmail: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus("");

      const response = await loginAPI(values.usernameOrEmail, values.password);

      if (!response.success) {
        console.log("error: ", response.success);
        setStatus(response.message);
        return;
      }

      dispatch(login(response.user));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, status }) => (
        <Form className="auth-form">
          <div className="text-center mb-4">
            <span className="form-eyebrow">WELCOME BACK</span>

            <h2 className="form-title">Sign in</h2>

            <p className="form-description">
              Sign in to continue to your RevBot account.
            </p>
          </div>

          <div className="d-grid gap-3">
            <FormikTextField
              type="text"
              name="usernameOrEmail"
              label="Username or Email"
            />

            <FormikTextField type="password" name="password" label="Password" />

            <div className="text-end">
              <a
                href={`${import.meta.env.VITE_API_URL}/auth/forgotPass`}
                className="auth-link"
              >
                Forgot password?
              </a>
            </div>

            {status && (
              <p className="error-message text-center mb-0">{status}</p>
            )}

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <a
              href={`${import.meta.env.VITE_API_URL}/auth/google`}
              className="btn btn-secondary"
            >
              Continue with Google
            </a>

            <p className="auth-switch text-center mb-0">
              Don't have an account?{" "}
              <button
                type="button"
                className="auth-link-button"
                disabled={isSubmitting}
                onClick={onSignUp}
              >
                Sign up
              </button>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
