import { Formik } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";
import AuthFormLayout from "./AuthFormLayout";
import AuthFormHeader from "./AuthFormHeader";

import UserValidationSchema from "../../validation/user.validationSchema";

const SignUpForm = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <AuthFormLayout>
          <AuthFormHeader
            eyebrow="GET STARTED"
            title="Create account"
            description="Create your StudyAssistant account to start making quizzes."
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
