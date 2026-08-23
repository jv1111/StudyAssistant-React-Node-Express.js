import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import FormikTextField from "../forms/FormikTextField";
import PassValidationSchema from "../../validation/PasswordValidation";

const ResetPassForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const submitHandler = async (data) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PassValidationSchema}
      onSubmit={async (userData, { setSubmitting }) => {
        await submitHandler({
          ...userData,
          userId,
        });

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormikTextField
            type="password"
            name="newPassword"
            label="New password"
          />

          <FormikTextField
            type="password"
            name="confirmPassword"
            label="Confirm password"
          />

          <button disabled={isSubmitting} type="submit">
            Reset password
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassForm;
