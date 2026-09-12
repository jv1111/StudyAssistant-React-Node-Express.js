import { Formik } from "formik";

import env from "../../config/env";
import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";
import GoogleSignInButton from "./GoogleSignInButton";

const LoginForm = ({ onSubmit, onSignUp }) => {
  const initialValues = {
    usernameOrEmail: "",
    password: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, status }) => (
        <AuthFormLayout>
          <AuthFormHeader
            eyebrow="WELCOME BACK"
            title="Sign in"
            description="Sign in to continue to your StudyAssistant account."
          />

          <div className="flex flex-col gap-4">
            <FormikTextField
              type="text"
              name="usernameOrEmail"
              label="Username or Email"
            />

            <FormikTextField type="password" name="password" label="Password" />

            <div className="flex justify-end">
              <a
                href={`${env.appUrl}/auth/forgotPass`}
                className="text-xs font-semibold text-muted transition-colors hover:text-primary"
              >
                Forgot password?
              </a>
            </div>

            {status && (
              <p className="rounded-lg bg-danger/10 p-2 text-center text-xs font-semibold text-danger">
                {status}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="my-1 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="text-xs font-bold tracking-wider text-muted/70">
                OR
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <GoogleSignInButton />
          </div>

          <p className="text-center text-sm text-muted">
            Don't have an account?{" "}
            <Button
              type="button"
              variant="link"
              disabled={isSubmitting}
              onClick={onSignUp}
            >
              Sign up
            </Button>
          </p>
        </AuthFormLayout>
      )}
    </Formik>
  );
};

export default LoginForm;
